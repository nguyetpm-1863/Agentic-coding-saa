import type { Metadata } from "next";
import { Montserrat, Montserrat_Alternates } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin", "vietnamese"],
	weight: ["400", "500", "700"],
	display: "swap",
});

const montserratAlternates = Montserrat_Alternates({
	variable: "--font-montserrat-alternates",
	subsets: ["latin", "vietnamese"],
	weight: ["700"],
	display: "swap",
});

// TODO: When font files are available, register via next/font/local:
// import localFont from "next/font/local";
// const digitalNumbers = localFont({ src: "../../public/fonts/digital-numbers.woff2", variable: "--font-digital-numbers", display: "swap" });
// const svnGotham = localFont({ src: "../../public/fonts/svn-gotham.woff2", variable: "--font-svn-gotham", display: "swap" });
// Then add ${digitalNumbers.variable} ${svnGotham.variable} to body className

export const metadata: Metadata = {
	title: "Sun Annual Awards 2025",
	description: "Sun Annual Awards 2025 - ROOT FURTHER",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="vi">
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
			</head>
			<body className={`${montserrat.variable} ${montserratAlternates.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
