import { Facebook, Globe, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";


export const appDetails = {
    name: "TIMMI",
    description: "TIMMI is a web application that allows you to manage your business.",
    version: "1.0.0",
    author: "TIMMI",
    authorEmail: "contact@TIMMI.fr",
    authorWebsite: "https://TIMMI.fr",
    contact: {
        phones: ["+33 1 23 45 67 89", "+33 6 98 76 54 32"],
        emails: ["contact@TIMMI.fr", "support@TIMMI.fr"],
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
            href: "https://www.facebook.com/TIMMI",
            icon: Facebook,
        },
        {
            href: "https://www.instagram.com/TIMMI",
            icon: Instagram,
        },
        {
            href: "https://www.twitter.com/TIMMI",
            icon: Twitter,
        },
        {
            href: "https://www.youtube.com/channel/UC_x5XG1OV2P6BVIhvvNFS7g",
            icon: Youtube,
        },
        {
            href: "https://www.linkedin.com/company/TIMMI",
            icon: Linkedin,
        },
    ],
    legal: {
        privacyPolicy: "https://TIMMI.fr/privacy-policy",
        termsOfService: "https://TIMMI.fr/terms-of-service",
        cookiePolicy: "https://TIMMI.fr/cookie-policy",
    },
    usefulLinks:[
        { 
            href: "https://service-public.gov.gn/", 
            text: "Service Public Guinéen",
            icon: Globe,
        },
    ]
}