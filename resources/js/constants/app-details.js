import { Facebook, Globe, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";


export const appDetails = {
    name: "MyApp",
    description: "MyApp is a web application that allows you to manage your business.",
    version: "1.0.0",
    author: "MyApp",
    authorEmail: "contact@myapp.fr",
    authorWebsite: "https://myapp.fr",
    contact: {
        phones: ["+33 1 23 45 67 89", "+33 6 98 76 54 32"],
        emails: ["contact@myapp.fr", "support@myapp.fr"],
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
            href: "https://www.facebook.com/myapp",
            icon: Facebook,
        },
        {
            href: "https://www.instagram.com/myapp",
            icon: Instagram,
        },
        {
            href: "https://www.twitter.com/myapp",
            icon: Twitter,
        },
        {
            href: "https://www.youtube.com/channel/UC_x5XG1OV2P6BVIhvvNFS7g",
            icon: Youtube,
        },
        {
            href: "https://www.linkedin.com/company/myapp",
            icon: Linkedin,
        },
    ],
    legal: {
        privacyPolicy: "https://myapp.fr/privacy-policy",
        termsOfService: "https://myapp.fr/terms-of-service",
        cookiePolicy: "https://myapp.fr/cookie-policy",
    },
    usefulLinks:[
        { 
            href: "https://service-public.gov.gn/", 
            text: "Service Public Guinéen",
            icon: Globe,
        },
    ]
}