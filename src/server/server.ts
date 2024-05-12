import express, { Request, Response } from 'express'; // Importing Express and its Request, Response types
const app = express(); // Creating an instance of Express application
app.use(express.json()); // Middleware to parse JSON bodies

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000; // Setting up the port to listen on

// API route
app.post('/api/mistral', async (req: Request, res: Response) => {
  // This function handles POST requests to '/api/mistral'
  // Your API interaction logic here
  res.status(200).send('Mistral API response'); // Sending a response with status 200 and message
});

app.listen(PORT, () => {
  // Starting the server and listening on the specified port
  console.log(`Server listening on port ${PORT}`);
});
