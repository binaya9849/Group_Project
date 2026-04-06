import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
	const transporter = nodemailer.createTransport({
		service: process.env.SMTP_SERVICE,
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT),
		auth: {
			user: process.env.SMTP_MAIL,
			pass: process.env.SMTP_PASSWORD,
		},
	});

	await transporter.sendMail({
		from: process.env.SMTP_MAIL,
		to: email,
		subject,
		html: message,
	});
};
