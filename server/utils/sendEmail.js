import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
	const smtpPort = Number(process.env.SMTP_PORT);
	const smtpUser = process.env.SMTP_MAIL?.trim();
	const smtpPassword = process.env.SMTP_PASSWORD?.replace(/\s+/g, "").trim();

	const transporter = nodemailer.createTransport({
		service: process.env.SMTP_SERVICE,
		host: process.env.SMTP_HOST,
		port: smtpPort,
		secure: smtpPort === 465,
		auth: {
			user: smtpUser,
			pass: smtpPassword,
		},
	});

	await transporter.sendMail({
		from: smtpUser,
		to: email,
		subject,
		html: message,
	});
};
