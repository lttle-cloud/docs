import Heading from "@theme/Heading";
import type { ReactNode } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

type SocialItem = {
    title: string;
    Svg: React.ComponentType<React.ComponentProps<"svg">>;
    href: string;
};

const socials: SocialItem[] = [
    {
        title: "GitHub",
        Svg: require("@site/static/img/social-media/github.svg").default,
        href: "https://github.com/lttle-cloud/ignition",
    },
    {
        title: "Discord",
        Svg: require("@site/static/img/social-media/discord.svg").default,
        href: "https://discord.gg/xhNGGrZQja",
    },
    {
        title: "LinkedIn",
        Svg: require("@site/static/img/social-media/linkedin.svg").default,
        href: "https://www.linkedin.com/company/lttle-cloud",
    },
];

function SocialCard({ title, Svg, href }: SocialItem) {
    return (
        <a
            className={clsx(styles.socialCard, title.toLowerCase())}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
        >
            <Svg className={styles.socialIcon} role="img" />
            <span className={styles.socialTitle}>{title}</span>
        </a>
    );
}

export default function HomepageSocials(): ReactNode {
    return (
        <section className={styles.socialsSection}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <Heading as="h2">join the community</Heading>
                    <p>
                        Connect with other developers and get help when you need
                        it.
                    </p>
                </div>
                <div className={styles.cardsRow}>
                    {socials.map((s, i) => (
                        <SocialCard key={i} {...s} />
                    ))}
                </div>
            </div>
        </section>
    );
}
