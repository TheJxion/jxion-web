/**
 * @fileoverview Modal Component Template
 *
 * Professional HTML template for Modal components across all frameworks.
 * Located in @jxion-core - templates only, no styles.
 */

export const modalTemplate = {
  html: `
    <div class="modal {{isOpen}} {{size}}" data-testid="modal" onclick="{{onBackdropClick}}">
      <div class="modal__backdrop"></div>
      <div class="modal__content" onclick="{{onContentClick}}">
        <div class="modal__header">
          <h2 class="modal__title" data-testid="modal-title">{{title}}</h2>
          <button class="modal__close" data-testid="modal-close" onclick="{{onClose}}">
            ✕
          </button>
        </div>
        <div class="modal__body" data-testid="modal-body">
          {{bodyContent}}
        </div>
        <div class="modal__footer" data-testid="modal-footer">
          {{footerContent}}
        </div>
      </div>
    </div>
  `,
  variables: [
    "isOpen",
    "size",
    "title",
    "bodyContent",
    "footerContent",
    "onBackdropClick",
    "onContentClick",
    "onClose",
  ],
};
