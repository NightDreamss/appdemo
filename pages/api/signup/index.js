import protectAPI from "../middleware/protectAPI";
import { connect } from "../../../libs/mysqlDB";
import bcrypt from "bcryptjs";
import { signupSchema } from "@/libs/schema";

const handler = async (req, res) => {
  const { name, email, phone, question, answer, password } = req.body;
  try {
    if (req.method === "POST") {
      const verify = await signupSchema.parse({
        name,
        email,
        confirmEmail: email,
        phone,
        question,
        answer,
        password,
        confirmPassword: password,
      });

      try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(verify.password, salt);
        const query = `INSERT INTO user values (uuid(), ?, ?, ?, ?, ?, ?, ?, CURRENT_TIME())`;
        const values = [
          `${verify.name}`,
          `${verify.email}`,
          `${hash}`,
          `${verify.phone}`,
          `${verify.question}`,
          `${verify.answer}`,
          `https://avatars.dicebear.com/api/initials/${verify.name}.png`,
        ];

        const results = await connect({ query, values });
        if (results?.affectedRows) return res.status(200).json(results);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    } else {
      return res
        .status(400)
        .json({ message: `HTTP method ${req.method} is not supported.` });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export default process.env.NODE_ENV === "development"
  ? handler
  : protectAPI(handler);
