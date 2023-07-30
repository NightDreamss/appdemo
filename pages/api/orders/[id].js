import protectAPI from "../middleware/protectAPI";
import { connect } from "../../../libs/mysqlDB";

const handler = async (req, res) => {
  const { status, total, products, position, geo } = req.body;
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      try {
        const query = `SELECT * FROM orders WHERE customerid = ? ORDER BY createdAt DESC`;
        const values = [`${id}`];
        const results = await connect({ query, values });
        return res.status(200).json(results);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    } else if (req.method === "POST") {
      try {
        const query = `INSERT INTO orders values (uuid(), ?, ?, ?, ?, ?, ?, ?, CURRENT_TIME())`;
        const values = [
          `${id}`,
          `${total}`,
          `${JSON.stringify(products)}`,
          `${position?.lat}`,
          `${position?.lng}`,
          `${geo}`,
          `${status}`,
        ];

        const results = await connect({ query, values });

        if (results?.affectedRows) return res.status(200).json("Success");
        else res.status(501);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    } else if (req.method === "PATCH") {
      try {
        const query =
          "UPDATE orders SET total = ?, products = ?, lat = ?, lng = ?, address = ?, status = ? WHERE id = ?";
        const values = [
          `${total}`,
          `${JSON.stringify(products)}`,
          `${position.lat}`,
          `${position.lng}`,
          `${geo}`,
          `${status}`,
          `${id}`,
        ];
        const results = await connect({ query, values });
        if (results?.affectedRows) {
          const query = `SELECT * FROM orders WHERE id = ?`;
          const values = [`${id}`];
          const [results] = await connect({ query, values });
          return res.status(200).json(results);
        }
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    } else if (req.method === "DELETE") {
      try {
        const query = `DELETE FROM orders WHERE id = ?`;
        const values = [`${id}`];
        const results = await connect({ query, values });
        if (results?.affectedRows) return res.status(200).json("Success");
        else
          return res
            .status(500)
            .json({ message: "There was an error deleting this order." });
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
