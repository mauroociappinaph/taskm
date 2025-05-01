import app from './app';
import { connectDB } from './config/database';

const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
