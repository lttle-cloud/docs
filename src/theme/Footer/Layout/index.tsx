import React, { useEffect, useState, type ReactNode } from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import type { Props } from "@theme/Footer/Layout";
import FooterLogo from "@site/static/img/footer-logo.svg";
import styles from "./styles.module.css";

export default function FooterLayout({
    style,
    links,
    logo,
    copyright,
}: Props): ReactNode {
    const [windowWidth, setWindowWidth] = useState(0);
    const logoHeight = windowWidth * 0.13;

    useEffect(() => {
        setWindowWidth(window.innerWidth);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <footer
            className={clsx(
                ThemeClassNames.layout.footer.container,
                styles.footer,
                "footer",
                {
                    "footer--dark": style === "dark",
                }
            )}
        >
            <div className="container container-fluid">
                {links}
                {(logo || copyright) && (
                    <div className="footer__bottom text--center">
                        {logo && (
                            <div className="margin-bottom--sm">{logo}</div>
                        )}
                        {copyright}
                    </div>
                )}
            </div>
            <div
                className={styles.footerLogoContainer}
                style={{
                    height: logoHeight,
                }}
            >
                <FooterLogo
                    style={{
                        left: -0.85 * windowWidth,
                        height: logoHeight,
                        width: windowWidth,
                    }}
                />
                <FooterLogo
                    style={{
                        left: 0.25 * windowWidth,
                        height: logoHeight,
                        width: windowWidth,
                    }}
                />
            </div>
        </footer>
    );
}
