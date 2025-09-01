import { Facebook, Globe, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";


export const appDetails = {
    name: "EVA",
    description: "EVA is a web application that allows you to manage your business.",
    version: "1.0.0",
    author: "EVA",
    authorEmail: "contact@EVA.fr",
    authorWebsite: "https://EVA.fr",
    contact: {
        phones: ["+33 1 23 45 67 89", "+33 6 98 76 54 32"],
        emails: ["contact@EVA.fr", "support@EVA.fr"],
        address: "123 Rue de la Technologie, 75001 Paris, France",
        hours: {
            weekdays: "Lundi - Vendredi",
            weekhours: "9h00 - 18h00"
        }
    },
    services: [
        { title: "Développement Web", link: "/services/web" },
        { title: "Applications Mobile", link: "/services/mobile" },
        { title: "Consultation IT", link: "/services/consulting" },
        { title: "Support Technique", link: "/services/support" },
        { title: "Hébergement Cloud", link: "/services/cloud" },
        { title: "Sécurité Informatique", link: "/services/security" },
        { title: "Formation Digitale", link: "/services/training" },
        { title: "Analytics & BI", link: "/services/analytics" },
    ],
    social: [
        {
            href: "https://www.facebook.com/EVA",
            icon: Facebook,
        },
        {
            href: "https://www.instagram.com/EVA",
            icon: Instagram,
        },
        {
            href: "https://www.twitter.com/EVA",
            icon: Twitter,
        },
        {
            href: "https://www.youtube.com/channel/UC_x5XG1OV2P6BVIhvvNFS7g",
            icon: Youtube,
        },
        {
            href: "https://www.linkedin.com/company/EVA",
            icon: Linkedin,
        },
    ],
    legal: {
        privacyPolicy: "https://EVA.fr/privacy-policy",
        termsOfService: "https://EVA.fr/terms-of-service",
        cookiePolicy: "https://EVA.fr/cookie-policy",
    },
    usefulLinks:[
        { 
            href: "https://service-public.gov.gn/", 
            text: "Service Public Guinéen",
            icon: Globe,
        },
    ]
}