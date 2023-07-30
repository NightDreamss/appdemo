import protectAPI from "../middleware/protectAPI";
import { connect } from "../../../libs/mysqlDB";
import { addCustomerSchema } from "@/libs/schema";

const handler = async (req, res) => {
  const { userID, name, email, phone } = req.body;
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      try {
        const query = `SELECT *, (SELECT COUNT(*) FROM orders WHERE orders.customerid = customer.id) AS orders FROM customer WHERE userid = ? ORDER BY createdAt DESC`;
        const values = [`${id}`];
        const results = await connect({ query, values });
        return res.status(200).json(results);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    } else if (req.method === "POST") {
      const verify = await addCustomerSchema.parse({
        name,
        email,
        phone,
      });

      try {
        const query = `INSERT INTO customer values (uuid(), ?, ?, ?, ?, CURRENT_TIME())`;
        const values = [
          `${id}`,
          `${verify.name}`,
          `${verify.email}`,
          `${verify.phone}`,
        ];

        const results = await connect({ query, values });
        if (results?.affectedRows) return res.status(200).json("Success");
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    } else if (req.method === "PATCH") {
      const verify = await addCustomerSchema.parse({
        name,
        email,
        phone,
      });

      try {
        const query = `SELECT userid FROM customer WHERE id = ?`;
        const values = [`${id}`];
        const [checkResults] = await connect({ query, values });

        if (checkResults.userid === userID) {
          const query =
            "UPDATE customer SET name = ?, email = ?, `phone` = ? WHERE id = ?";
          const values = [
            `${verify.name}`,
            `${verify.email}`,
            `${verify.phone}`,
            `${id}`,
          ];

          const results = await connect({ query, values });
          if (results?.affectedRows) {
            const query = `SELECT *, (SELECT COUNT(*) FROM orders WHERE orders.customerid = customer.id) AS orders FROM customer WHERE id = ?`;
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
        const query = `DELETE FROM customer WHERE id = ?`;
        const values = [`${id}`];
        const results = await connect({ query, values });

        if (results?.affectedRows) return res.status(200).json("Success");
        else
          return res
            .status(500)
            .json({ message: "There was an error deleting this customer." });
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
