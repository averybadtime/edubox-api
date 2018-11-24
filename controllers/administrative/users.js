const admin = require("../../firebase")
const emailPattern = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")

async function create(req, res) {
	const email = req.body.email
	const password = req.body.password
	if (email && password) {
		try {
			const user = await admin
				.auth()
				.createUser({
					email: email,
					password: password
				})
			res.status(200).send({ uid: user.uid })
		} catch (ex) {
			res.status(500).send(ex)
		}
	}
}

async function updateEmailAndPassword(req, res) {
	const uid = req.body.uid
	const email = req.body.email
	const password = req.body.password && req.body.password.length >= 6 ? req.body.password : undefined
	if (email && email.trim() === "") return res.status(500).send({ message: "No se proporcionó un e-mail." })
	if (uid && uid.trim() === "") return res.status(500).send({ message: "No se proporcionó un ID de usuario." })
	if (!emailPattern.test(email)) return res.status(500).send({ message: "El e-mail proporcionado no es válido." })
	try {
		const updatedUser = await admin.auth().updateUser(uid, {
			email,
			password
		})
		return res.status(200).send({ message: "Información actualizada con éxito." })
	} catch (ex) {
		let message
		switch (ex.code) {
			case "auth/invalid-email":
				message = "El e-mail proporcionado no es válido."
				break
			case "auth/email-already-exists":
				message = "E-mail ya registrado en la base de datos. Verifique e intente nuevamente."
				break
			default:
				message = "Ocurrió un error en el servidor al actualizar el correo."
				break
		}
		res.status(500).send({ message })
	}
}

module.exports = {
	create,
	updateEmailAndPassword
}