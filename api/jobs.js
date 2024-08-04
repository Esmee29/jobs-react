export default (req, res) => {
    if (req.method === 'GET') {
      res.status(200).json({ message: 'Jobs fetched successfully' });
    } else if (req.method === 'POST') {
      res.status(201).json({ message: 'Job created successfully' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  };
  