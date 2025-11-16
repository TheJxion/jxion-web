/**
 * Jxion Stack — Dictionary Loader
 * Phase Reference: Phase 1 — Dynamic Content Foundations
 * Description: Load dictionary files dynamically (matching ustad get-dictionary.ts pattern)
 */
import type { Locale } from "./i18n-config";
declare const dictionaries: {
    readonly "en-US": () => Promise<{
        home: {
            makeUp: {
                message: string;
                phoneNumber: string;
                contactLabel: string;
            };
            hero: {
                title: string;
                subtitle: string;
                cta: string;
                description: string;
                statslabel: string;
                stats: string;
            };
            keyFeatures: {
                title: string;
                subtitle: string;
                kursiyer_yonetimi_title: string;
                kursiyer_yonetimi_desc: string;
                kursiyer_yonetimi_footnote: string;
                kurs_yonetimi_title: string;
                kurs_yonetimi_desc: string;
                kurs_yonetimi_footnote: string;
                sinav_yonetimi_title: string;
                sinav_yonetimi_desc: string;
                sinav_yonetimi_footnote: string;
                finansal_yonetim_title: string;
                finansal_yonetim_desc: string;
                finansal_yonetim_footnote: string;
                belge_yonetimi_title: string;
                belge_yonetimi_desc: string;
                belge_yonetimi_footnote: string;
                arac_yonetimi_title: string;
                arac_yonetimi_desc: string;
                arac_yonetimi_footnote: string;
                common_cta: string;
                common_cta_link: string;
            };
            features: {
                title: string;
                subtitle: string;
                list: {
                    title: string;
                    description: string;
                }[];
            };
            integration: {
                title: string;
                subtitle: string;
            };
            featuresCarousel: {
                title: string;
                subtitle: string;
                list: ({
                    icon: string;
                    title: string;
                    description: string;
                    ctaText: string;
                    footnote: string;
                    variant: string;
                } | {
                    icon: string;
                    title: string;
                    description: string;
                    ctaText: string;
                    footnote: string;
                    variant?: undefined;
                })[];
            };
            integrationTitle: string;
            integrationSubtitle: string;
            integrationSolutionTitles: string[];
            integrationSolutionDescriptions: string[];
            integrationCta: string;
            integrationMakeUp: string;
            journey: {
                title: string;
                description: string;
                benefits: string[];
                cta: string;
            };
            whyYesilDefter: {
                highlight: string;
                title: string;
                subtitle: string;
                description: string;
                benefits: {
                    name: string;
                    features: string[];
                }[];
                cta: string;
            };
            mobileFeatures: {
                title: string;
                comingSoon: string;
                subtitle: string;
                qrTitle: string;
                qrDescription: string;
                qrFeatures: string[];
                ocrTitle: string;
                ocrDescription: string;
                ocrFeatures: string[];
                documentHeader: {
                    title: string;
                };
                documentFields: string[];
            };
            nextSteps: {
                title: string;
                subtitle: string;
                list: ({
                    title: string;
                    description: string;
                    ctaText: string;
                    link: string;
                    color: string;
                    icon: string;
                    category: string;
                    difficulty: string;
                    estimatedTime: string;
                    tags: string[];
                    featured: boolean;
                } | {
                    title: string;
                    description: string;
                    ctaText: string;
                    link: string;
                    color: string;
                    icon: string;
                    category: string;
                    difficulty: string;
                    estimatedTime: string;
                    tags: string[];
                    featured?: undefined;
                })[];
            };
            faq: {
                title: string;
                description: string;
                items: {
                    question: string;
                    answer: string;
                }[];
            };
            integrationSolutions: {
                title: string;
                subtitle: string;
                items: {
                    title: string;
                    image: string;
                    description: string;
                    features: string[];
                    cta: string;
                    ctaLink: string;
                    comingSoon: boolean;
                }[];
            };
            whatsourimpact: {
                title: {
                    regular: string;
                    highlight: string;
                    regularcontiniued: string;
                };
                stats: {
                    value: string;
                    label: string;
                    color: string;
                }[];
            };
            whatCanWeDoForYou: {
                title: {
                    regular: string;
                    highlight: string;
                    regularcontinued: string;
                };
                subtitle: string;
                featuredBadge: string;
                metadata: {
                    duration: string;
                    difficulty: string;
                    rating: string;
                    reviews: string;
                };
                tabs: {
                    id: string;
                    title: string;
                    content: {
                        title: string;
                        subtitle: string;
                        description: string;
                        features: string[];
                        actions: {
                            text: string;
                            variant: string;
                        }[];
                    };
                }[];
            };
            trafficSign: {
                title: string;
                descriptions: string[];
                icons: string[];
            };
        };
        footer: {
            title: string;
            description: string;
            cta: string;
            links: {
                label: string;
                href: string;
            }[];
            linksSecondary: {
                label: string;
                href: string;
            }[];
        };
        navigation: {
            items: {
                label: string;
                href: string;
            }[];
            home: string;
            about: string;
            documentation: string;
            announcements: string;
            eExam: string;
            purchase: string;
            support: string;
        };
        common: {
            learnMore: string;
            getStarted: string;
            contact: string;
            close: string;
            closeModal: string;
            loading: string;
            error: string;
            success: string;
            save: string;
            cancel: string;
            confirm: string;
            delete: string;
            edit: string;
            view: string;
            download: string;
            upload: string;
            search: string;
            toggleMenu: string;
            exit: string;
            login: string;
            logout: string;
            profile: string;
        };
        whatsapp: {
            thread: {
                loading: string;
                errorTitle: string;
                empty: string;
                emptyMessages: string;
                inputPlaceholder: string;
                send: string;
                sending: string;
                demoLabel: string;
            };
            composeModal: {
                title: string;
                phoneLabel: string;
                phonePlaceholder: string;
                messageLabel: string;
                messagePlaceholder: string;
                aiLabel: string;
                cancel: string;
                send: string;
                sending: string;
            };
            inbox: {
                loading: string;
                errorTitle: string;
                emptyTitle: string;
                emptyDescription: string;
                emptyDescriptionDemo: string;
                emptyFootnoteDemo: string;
                demoBanner: string;
                showingCount: string;
            };
            status: {
                justNow: string;
                minutesAgo: string;
                hoursAgo: string;
                daysAgo: string;
            };
            bubble: {
                aiLabel: string;
            };
        };
        forms: {
            resetPassword: {
                successTitle: string;
                successMessage: string;
                successCta: string;
                title: string;
                description: string;
                newPasswordLabel: string;
                newPasswordHelper: string;
                confirmPasswordLabel: string;
                confirmPasswordHelper: string;
                submitLabel: string;
                submitLoading: string;
                tokenInfo: string;
                errorMissingToken: string;
                errorMismatch: string;
                errorTooShort: string;
                errorGeneric: string;
            };
            signForDemo: {
                success: string;
                nameLabel: string;
                emailLabel: string;
                noteLabel: string;
                submit: string;
                back: string;
            };
            forgetPassword: {
                emailLabel: string;
                emailPlaceholder: string;
                submit: string;
                submitLoading: string;
                success: string;
                failure: string;
                back: string;
            };
            login: {
                title: string;
                emailLabel: string;
                emailHelper: string;
                emailPlaceholder: string;
                passwordLabel: string;
                passwordHelper: string;
                passwordPlaceholder: string;
                submit: string;
                submitLoading: string;
                forgotPassword: string;
                requestDemo: string;
                errorGeneric: string;
            };
        };
        documentation: {
            breadcrumb: {
                root: string;
                ariaLabel: string;
            };
            cards: {
                note: {
                    title: string;
                    message: string;
                };
                tip: {
                    title: string;
                    message: string;
                    relatedPrefix: string;
                };
                feature: {
                    title: string;
                    subtitle: string;
                    features: ({
                        icon: string;
                        title: string;
                        description: string;
                        ctaText: string;
                        footnote: string;
                        variant: string;
                    } | {
                        icon: string;
                        title: string;
                        description: string;
                        ctaText: string;
                        footnote: string;
                        variant?: undefined;
                    })[];
                };
                redefineProductivity: {
                    title: string;
                    subtitle: string;
                    primaryAction: {
                        text: string;
                        link: string;
                        external: boolean;
                        variant: string;
                    };
                    featureAction: {
                        external: string;
                        default: string;
                    };
                    features: ({
                        icon: string;
                        title: string;
                        description: string;
                        variant: string;
                    } | {
                        icon: string;
                        title: string;
                        description: string;
                        variant?: undefined;
                    })[];
                };
                testimonial: {
                    title: string;
                    description: string;
                    actions: {
                        external: string;
                        default: string;
                    };
                    ratingSuffix: string;
                    authorConnector: string;
                };
                documentation: {
                    title: string;
                    description: string;
                };
            };
        };
        cta: {
            title: string;
            button: string;
            highlight: string;
        };
        sidebar: {
            title: string;
            empty: string;
            toggle: {
                expand: string;
                collapse: string;
            };
        };
        about: {
            hero: {
                title: string;
                description: string;
                cta: string;
                imageAlt: string;
            };
            licenceJourney: {
                title: string;
                subtitle: string;
                description: string;
                steps: {
                    title: string;
                    description: string;
                    metadata: {
                        duration: string;
                        difficulty: string;
                        requirements: string[];
                    };
                }[];
                benefits: string[];
                requirementsLabel: string;
                progressCompleted: string;
                controls: {
                    play: string;
                    pause: string;
                    goToStep: string;
                };
                primaryAction: {
                    text: string;
                    link: string;
                };
            };
        };
    }>;
    readonly "tr-TR": () => Promise<{
        home: {
            makeUp: {
                message: string;
                phoneNumber: string;
                contactLabel: string;
            };
            hero: {
                title: string;
                subtitle: string;
                cta: string;
                description: string;
                statslabel: string;
                stats: string;
            };
            keyFeatures: {
                title: string;
                subtitle: string;
                kursiyer_yonetimi_title: string;
                kursiyer_yonetimi_desc: string;
                kursiyer_yonetimi_footnote: string;
                kurs_yonetimi_title: string;
                kurs_yonetimi_desc: string;
                kurs_yonetimi_footnote: string;
                sinav_yonetimi_title: string;
                sinav_yonetimi_desc: string;
                sinav_yonetimi_footnote: string;
                finansal_yonetim_title: string;
                finansal_yonetim_desc: string;
                finansal_yonetim_footnote: string;
                belge_yonetimi_title: string;
                belge_yonetimi_desc: string;
                belge_yonetimi_footnote: string;
                arac_yonetimi_title: string;
                arac_yonetimi_desc: string;
                arac_yonetimi_footnote: string;
                common_cta: string;
                common_cta_link: string;
            };
            integration: {
                title: string;
                subtitle: string;
            };
            integrationSolutions: {
                title: string;
                subtitle: string;
                common_cta: string;
                common_cta_link: string;
                items: {
                    title: string;
                    image: string;
                    description: string;
                    features: string[];
                    comingSoon: boolean;
                }[];
            };
            features: {
                title: string;
                subtitle: string;
                list: {
                    title: string;
                    description: string;
                }[];
            };
            featuresCarousel: {
                title: string;
                subtitle: string;
                common_cta: string;
                list: ({
                    icon: string;
                    title: string;
                    description: string;
                    footnote: string;
                    variant: string;
                } | {
                    icon: string;
                    title: string;
                    description: string;
                    footnote: string;
                    variant?: undefined;
                })[];
            };
            integrationTitle: string;
            integrationSubtitle: string;
            integrationSolutionTitles: string[];
            integrationSolutionDescriptions: string[];
            integrationCta: string;
            integrationMakeUp: string;
            journey: {
                title: string;
                description: string;
                benefits: string[];
                cta: string;
            };
            whyYesilDefter: {
                highlight: string;
                title: string;
                description: string;
                benefits: {
                    name: string;
                    features: string[];
                }[];
                cta: string;
            };
            mobileFeatures: {
                title: string;
                comingSoon: string;
                subtitle: string;
                qrTitle: string;
                qrDescription: string;
                qrFeatures: string[];
                ocrTitle: string;
                ocrDescription: string;
                ocrFeatures: string[];
                documentHeader: {
                    title: string;
                };
                documentFields: string[];
            };
            whatsourimpact: {
                title: {
                    regular: string;
                    highlight: string;
                    regularcontiniued: string;
                };
                stats: {
                    value: string;
                    label: string;
                    color: string;
                }[];
            };
            nextSteps: {
                title: string;
                subtitle: string;
                list: ({
                    title: string;
                    description: string;
                    ctaText: string;
                    link: string;
                    color: string;
                    icon: string;
                    category: string;
                    difficulty: string;
                    estimatedTime: string;
                    tags: string[];
                    featured: boolean;
                } | {
                    title: string;
                    description: string;
                    ctaText: string;
                    link: string;
                    color: string;
                    icon: string;
                    category: string;
                    difficulty: string;
                    estimatedTime: string;
                    tags: string[];
                    featured?: undefined;
                })[];
            };
            faq: {
                title: string;
                description: string;
                items: {
                    question: string;
                    answer: string;
                }[];
            };
            whatCanWeDoForYou: {
                title: {
                    regular: string;
                    highlight: string;
                    regularcontinued: string;
                };
                subtitle: string;
                featuredBadge: string;
                metadata: {
                    duration: string;
                    difficulty: string;
                    rating: string;
                    reviews: string;
                };
                tabs: {
                    id: string;
                    title: string;
                    content: {
                        title: string;
                        subtitle: string;
                        description: string;
                        features: string[];
                        actions: {
                            text: string;
                            variant: string;
                        }[];
                    };
                }[];
            };
            trafficSign: {
                title: string;
                descriptions: string[];
                icons: string[];
            };
        };
        footer: {
            title: string;
            description: string;
            cta: string;
            links: {
                label: string;
                href: string;
            }[];
            linksSecondary: {
                label: string;
                href: string;
            }[];
        };
        navigation: {
            home: string;
            features: string;
            solutions: string;
            about: string;
            contact: string;
            login: string;
            documentation: string;
            announcements: string;
            eExam: string;
            purchase: string;
            support: string;
        };
        common: {
            learnMore: string;
            getStarted: string;
            contact: string;
            close: string;
            closeModal: string;
            loading: string;
            error: string;
            success: string;
            save: string;
            cancel: string;
            confirm: string;
            delete: string;
            edit: string;
            view: string;
            download: string;
            upload: string;
            search: string;
            toggleMenu: string;
            exit: string;
            login: string;
            logout: string;
            profile: string;
        };
    }>;
};
type SupportedLocale = keyof typeof dictionaries;
export declare const getDictionary: (locale: Locale | string) => Promise<{
    home: {
        makeUp: {
            message: string;
            phoneNumber: string;
            contactLabel: string;
        };
        hero: {
            title: string;
            subtitle: string;
            cta: string;
            description: string;
            statslabel: string;
            stats: string;
        };
        keyFeatures: {
            title: string;
            subtitle: string;
            kursiyer_yonetimi_title: string;
            kursiyer_yonetimi_desc: string;
            kursiyer_yonetimi_footnote: string;
            kurs_yonetimi_title: string;
            kurs_yonetimi_desc: string;
            kurs_yonetimi_footnote: string;
            sinav_yonetimi_title: string;
            sinav_yonetimi_desc: string;
            sinav_yonetimi_footnote: string;
            finansal_yonetim_title: string;
            finansal_yonetim_desc: string;
            finansal_yonetim_footnote: string;
            belge_yonetimi_title: string;
            belge_yonetimi_desc: string;
            belge_yonetimi_footnote: string;
            arac_yonetimi_title: string;
            arac_yonetimi_desc: string;
            arac_yonetimi_footnote: string;
            common_cta: string;
            common_cta_link: string;
        };
        features: {
            title: string;
            subtitle: string;
            list: {
                title: string;
                description: string;
            }[];
        };
        integration: {
            title: string;
            subtitle: string;
        };
        featuresCarousel: {
            title: string;
            subtitle: string;
            list: ({
                icon: string;
                title: string;
                description: string;
                ctaText: string;
                footnote: string;
                variant: string;
            } | {
                icon: string;
                title: string;
                description: string;
                ctaText: string;
                footnote: string;
                variant?: undefined;
            })[];
        };
        integrationTitle: string;
        integrationSubtitle: string;
        integrationSolutionTitles: string[];
        integrationSolutionDescriptions: string[];
        integrationCta: string;
        integrationMakeUp: string;
        journey: {
            title: string;
            description: string;
            benefits: string[];
            cta: string;
        };
        whyYesilDefter: {
            highlight: string;
            title: string;
            subtitle: string;
            description: string;
            benefits: {
                name: string;
                features: string[];
            }[];
            cta: string;
        };
        mobileFeatures: {
            title: string;
            comingSoon: string;
            subtitle: string;
            qrTitle: string;
            qrDescription: string;
            qrFeatures: string[];
            ocrTitle: string;
            ocrDescription: string;
            ocrFeatures: string[];
            documentHeader: {
                title: string;
            };
            documentFields: string[];
        };
        nextSteps: {
            title: string;
            subtitle: string;
            list: ({
                title: string;
                description: string;
                ctaText: string;
                link: string;
                color: string;
                icon: string;
                category: string;
                difficulty: string;
                estimatedTime: string;
                tags: string[];
                featured: boolean;
            } | {
                title: string;
                description: string;
                ctaText: string;
                link: string;
                color: string;
                icon: string;
                category: string;
                difficulty: string;
                estimatedTime: string;
                tags: string[];
                featured?: undefined;
            })[];
        };
        faq: {
            title: string;
            description: string;
            items: {
                question: string;
                answer: string;
            }[];
        };
        integrationSolutions: {
            title: string;
            subtitle: string;
            items: {
                title: string;
                image: string;
                description: string;
                features: string[];
                cta: string;
                ctaLink: string;
                comingSoon: boolean;
            }[];
        };
        whatsourimpact: {
            title: {
                regular: string;
                highlight: string;
                regularcontiniued: string;
            };
            stats: {
                value: string;
                label: string;
                color: string;
            }[];
        };
        whatCanWeDoForYou: {
            title: {
                regular: string;
                highlight: string;
                regularcontinued: string;
            };
            subtitle: string;
            featuredBadge: string;
            metadata: {
                duration: string;
                difficulty: string;
                rating: string;
                reviews: string;
            };
            tabs: {
                id: string;
                title: string;
                content: {
                    title: string;
                    subtitle: string;
                    description: string;
                    features: string[];
                    actions: {
                        text: string;
                        variant: string;
                    }[];
                };
            }[];
        };
        trafficSign: {
            title: string;
            descriptions: string[];
            icons: string[];
        };
    };
    footer: {
        title: string;
        description: string;
        cta: string;
        links: {
            label: string;
            href: string;
        }[];
        linksSecondary: {
            label: string;
            href: string;
        }[];
    };
    navigation: {
        items: {
            label: string;
            href: string;
        }[];
        home: string;
        about: string;
        documentation: string;
        announcements: string;
        eExam: string;
        purchase: string;
        support: string;
    };
    common: {
        learnMore: string;
        getStarted: string;
        contact: string;
        close: string;
        closeModal: string;
        loading: string;
        error: string;
        success: string;
        save: string;
        cancel: string;
        confirm: string;
        delete: string;
        edit: string;
        view: string;
        download: string;
        upload: string;
        search: string;
        toggleMenu: string;
        exit: string;
        login: string;
        logout: string;
        profile: string;
    };
    whatsapp: {
        thread: {
            loading: string;
            errorTitle: string;
            empty: string;
            emptyMessages: string;
            inputPlaceholder: string;
            send: string;
            sending: string;
            demoLabel: string;
        };
        composeModal: {
            title: string;
            phoneLabel: string;
            phonePlaceholder: string;
            messageLabel: string;
            messagePlaceholder: string;
            aiLabel: string;
            cancel: string;
            send: string;
            sending: string;
        };
        inbox: {
            loading: string;
            errorTitle: string;
            emptyTitle: string;
            emptyDescription: string;
            emptyDescriptionDemo: string;
            emptyFootnoteDemo: string;
            demoBanner: string;
            showingCount: string;
        };
        status: {
            justNow: string;
            minutesAgo: string;
            hoursAgo: string;
            daysAgo: string;
        };
        bubble: {
            aiLabel: string;
        };
    };
    forms: {
        resetPassword: {
            successTitle: string;
            successMessage: string;
            successCta: string;
            title: string;
            description: string;
            newPasswordLabel: string;
            newPasswordHelper: string;
            confirmPasswordLabel: string;
            confirmPasswordHelper: string;
            submitLabel: string;
            submitLoading: string;
            tokenInfo: string;
            errorMissingToken: string;
            errorMismatch: string;
            errorTooShort: string;
            errorGeneric: string;
        };
        signForDemo: {
            success: string;
            nameLabel: string;
            emailLabel: string;
            noteLabel: string;
            submit: string;
            back: string;
        };
        forgetPassword: {
            emailLabel: string;
            emailPlaceholder: string;
            submit: string;
            submitLoading: string;
            success: string;
            failure: string;
            back: string;
        };
        login: {
            title: string;
            emailLabel: string;
            emailHelper: string;
            emailPlaceholder: string;
            passwordLabel: string;
            passwordHelper: string;
            passwordPlaceholder: string;
            submit: string;
            submitLoading: string;
            forgotPassword: string;
            requestDemo: string;
            errorGeneric: string;
        };
    };
    documentation: {
        breadcrumb: {
            root: string;
            ariaLabel: string;
        };
        cards: {
            note: {
                title: string;
                message: string;
            };
            tip: {
                title: string;
                message: string;
                relatedPrefix: string;
            };
            feature: {
                title: string;
                subtitle: string;
                features: ({
                    icon: string;
                    title: string;
                    description: string;
                    ctaText: string;
                    footnote: string;
                    variant: string;
                } | {
                    icon: string;
                    title: string;
                    description: string;
                    ctaText: string;
                    footnote: string;
                    variant?: undefined;
                })[];
            };
            redefineProductivity: {
                title: string;
                subtitle: string;
                primaryAction: {
                    text: string;
                    link: string;
                    external: boolean;
                    variant: string;
                };
                featureAction: {
                    external: string;
                    default: string;
                };
                features: ({
                    icon: string;
                    title: string;
                    description: string;
                    variant: string;
                } | {
                    icon: string;
                    title: string;
                    description: string;
                    variant?: undefined;
                })[];
            };
            testimonial: {
                title: string;
                description: string;
                actions: {
                    external: string;
                    default: string;
                };
                ratingSuffix: string;
                authorConnector: string;
            };
            documentation: {
                title: string;
                description: string;
            };
        };
    };
    cta: {
        title: string;
        button: string;
        highlight: string;
    };
    sidebar: {
        title: string;
        empty: string;
        toggle: {
            expand: string;
            collapse: string;
        };
    };
    about: {
        hero: {
            title: string;
            description: string;
            cta: string;
            imageAlt: string;
        };
        licenceJourney: {
            title: string;
            subtitle: string;
            description: string;
            steps: {
                title: string;
                description: string;
                metadata: {
                    duration: string;
                    difficulty: string;
                    requirements: string[];
                };
            }[];
            benefits: string[];
            requirementsLabel: string;
            progressCompleted: string;
            controls: {
                play: string;
                pause: string;
                goToStep: string;
            };
            primaryAction: {
                text: string;
                link: string;
            };
        };
    };
} | {
    home: {
        makeUp: {
            message: string;
            phoneNumber: string;
            contactLabel: string;
        };
        hero: {
            title: string;
            subtitle: string;
            cta: string;
            description: string;
            statslabel: string;
            stats: string;
        };
        keyFeatures: {
            title: string;
            subtitle: string;
            kursiyer_yonetimi_title: string;
            kursiyer_yonetimi_desc: string;
            kursiyer_yonetimi_footnote: string;
            kurs_yonetimi_title: string;
            kurs_yonetimi_desc: string;
            kurs_yonetimi_footnote: string;
            sinav_yonetimi_title: string;
            sinav_yonetimi_desc: string;
            sinav_yonetimi_footnote: string;
            finansal_yonetim_title: string;
            finansal_yonetim_desc: string;
            finansal_yonetim_footnote: string;
            belge_yonetimi_title: string;
            belge_yonetimi_desc: string;
            belge_yonetimi_footnote: string;
            arac_yonetimi_title: string;
            arac_yonetimi_desc: string;
            arac_yonetimi_footnote: string;
            common_cta: string;
            common_cta_link: string;
        };
        integration: {
            title: string;
            subtitle: string;
        };
        integrationSolutions: {
            title: string;
            subtitle: string;
            common_cta: string;
            common_cta_link: string;
            items: {
                title: string;
                image: string;
                description: string;
                features: string[];
                comingSoon: boolean;
            }[];
        };
        features: {
            title: string;
            subtitle: string;
            list: {
                title: string;
                description: string;
            }[];
        };
        featuresCarousel: {
            title: string;
            subtitle: string;
            common_cta: string;
            list: ({
                icon: string;
                title: string;
                description: string;
                footnote: string;
                variant: string;
            } | {
                icon: string;
                title: string;
                description: string;
                footnote: string;
                variant?: undefined;
            })[];
        };
        integrationTitle: string;
        integrationSubtitle: string;
        integrationSolutionTitles: string[];
        integrationSolutionDescriptions: string[];
        integrationCta: string;
        integrationMakeUp: string;
        journey: {
            title: string;
            description: string;
            benefits: string[];
            cta: string;
        };
        whyYesilDefter: {
            highlight: string;
            title: string;
            description: string;
            benefits: {
                name: string;
                features: string[];
            }[];
            cta: string;
        };
        mobileFeatures: {
            title: string;
            comingSoon: string;
            subtitle: string;
            qrTitle: string;
            qrDescription: string;
            qrFeatures: string[];
            ocrTitle: string;
            ocrDescription: string;
            ocrFeatures: string[];
            documentHeader: {
                title: string;
            };
            documentFields: string[];
        };
        whatsourimpact: {
            title: {
                regular: string;
                highlight: string;
                regularcontiniued: string;
            };
            stats: {
                value: string;
                label: string;
                color: string;
            }[];
        };
        nextSteps: {
            title: string;
            subtitle: string;
            list: ({
                title: string;
                description: string;
                ctaText: string;
                link: string;
                color: string;
                icon: string;
                category: string;
                difficulty: string;
                estimatedTime: string;
                tags: string[];
                featured: boolean;
            } | {
                title: string;
                description: string;
                ctaText: string;
                link: string;
                color: string;
                icon: string;
                category: string;
                difficulty: string;
                estimatedTime: string;
                tags: string[];
                featured?: undefined;
            })[];
        };
        faq: {
            title: string;
            description: string;
            items: {
                question: string;
                answer: string;
            }[];
        };
        whatCanWeDoForYou: {
            title: {
                regular: string;
                highlight: string;
                regularcontinued: string;
            };
            subtitle: string;
            featuredBadge: string;
            metadata: {
                duration: string;
                difficulty: string;
                rating: string;
                reviews: string;
            };
            tabs: {
                id: string;
                title: string;
                content: {
                    title: string;
                    subtitle: string;
                    description: string;
                    features: string[];
                    actions: {
                        text: string;
                        variant: string;
                    }[];
                };
            }[];
        };
        trafficSign: {
            title: string;
            descriptions: string[];
            icons: string[];
        };
    };
    footer: {
        title: string;
        description: string;
        cta: string;
        links: {
            label: string;
            href: string;
        }[];
        linksSecondary: {
            label: string;
            href: string;
        }[];
    };
    navigation: {
        home: string;
        features: string;
        solutions: string;
        about: string;
        contact: string;
        login: string;
        documentation: string;
        announcements: string;
        eExam: string;
        purchase: string;
        support: string;
    };
    common: {
        learnMore: string;
        getStarted: string;
        contact: string;
        close: string;
        closeModal: string;
        loading: string;
        error: string;
        success: string;
        save: string;
        cancel: string;
        confirm: string;
        delete: string;
        edit: string;
        view: string;
        download: string;
        upload: string;
        search: string;
        toggleMenu: string;
        exit: string;
        login: string;
        logout: string;
        profile: string;
    };
}>;
export declare const getSupportedLocale: (locale: Locale | string) => SupportedLocale;
export {};
//# sourceMappingURL=get-dictionary.d.ts.map