import protectAPI from "../middleware/protectAPI";
import { connect } from "../../../libs/mysqlDB";
import { addProductSchema } from "@/libs/schema";

const handler = async (req, res) => {
  const { userID, name, price, image, desc } = req.body;
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      try {
        const query = `SELECT * FROM products WHERE userid = ?`;
        const values = [`${id}`];
        const results = await connect({ query, values });
        return res.status(200).json(results);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    } else if (req.method === "POST") {
      const verify = await addProductSchema.parse({
        name,
        price,
        desc,
      });

      try {
        const query = `INSERT INTO products values (uuid(), ?, ?, ?, ?, ?)`;
        const values = [
          `${id}`,
          `${verify.name}`,
          `${verify.price}`,
          `${verify.desc}`,
          `${image}`,
        ];

        const results = await connect({ query, values });
        if (results?.affectedRows) return res.status(200).json("Success");
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    } else if (req.method === "PATCH") {
      const verify = await addProductSchema.parse({
        name,
        price,
        desc,
      });

      try {
        const query = `SELECT userid FROM products WHERE id = ?`;
        const values = [`${id}`];
        const [checkResults] = await connect({ query, values });

        if (checkResults.userid === userID) {
          const query =
            "UPDATE products SET name = ?, price = ?, `desc` = ?, image = ? WHERE id = ?";
          const values = [
            `${verify.name}`,
            `${verify.price}`,
            `${verify.desc}`,
            `${image}`,
            `${id}`,
          ];

          const results = await connect({ query, values });
          if (results?.affectedRows) {
            const query = `SELECT * FROM products WHERE id = ?`;
            const values = [`${id}`];
            const [results] = await connect({ query, values });
            return res.status(200).json(results);
          }
        } else {
          return res.status(401).json({ message: "Unauthorized" });
        }
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    } else if (req.method === "DELETE") {
      try {
        const query = `DELETE FROM products WHERE id = ?`;
        const values = [`${id}`];
        const results = await connect({ query, values });

        if (results?.affectedRows) return res.status(200).json("Success");
        else
          return res
            .status(500)
            .json({ message: "There was an error deleting this product." });
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
