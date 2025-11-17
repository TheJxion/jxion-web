package services

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"time"
)

// OriginService fetches content from the CMS-origin endpoint.
type OriginService struct {
	baseEndpoint *url.URL
	httpClient   *http.Client
}

// NewOriginService constructs the origin fetcher with a CMS endpoint base.
func NewOriginService(rawEndpoint string) (*OriginService, error) {
	if rawEndpoint == "" {
		rawEndpoint = "http://localhost:8080/api/content"
	}

	parsed, err := url.Parse(rawEndpoint)
	if err != nil {
		return nil, fmt.Errorf("invalid origin endpoint: %w", err)
	}

	return &OriginService{
		baseEndpoint: parsed,
		httpClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}, nil
}

// FetchContent retrieves content from the CMS endpoint and wraps it as AIContent.
func (o *OriginService) FetchContent(ctx context.Context, id string) (AIContent, error) {
	fullURL := *o.baseEndpoint
	fullURL.Path = strings.TrimRight(o.baseEndpoint.Path, "/") + "/" + strings.TrimLeft(id, "/")

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, fullURL.String(), nil)
	if err != nil {
		return AIContent{}, err
	}
	req.Header.Set("Accept", "application/json")

	resp, err := o.httpClient.Do(req)
	if err != nil {
		return AIContent{}, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(io.LimitReader(resp.Body, 256))
		return AIContent{}, fmt.Errorf("origin request failed (%d): %s", resp.StatusCode, string(body))
	}

	payload, err := io.ReadAll(resp.Body)
	if err != nil {
		return AIContent{}, err
	}

	if !json.Valid(payload) {
		return AIContent{}, fmt.Errorf("origin payload invalid json")
	}

	return AIContent{
		ID:      id,
		Content: payload,
		Note:    "cms-origin",
	}, nil
}
