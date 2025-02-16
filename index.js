import 'dotenv/config'
//Building a CRUD(CREATE, READ, UPDATE, DELETE) application
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

//add a new tea
app.post('/teas', (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: "Name and price are required!" });
    }

    const newTea = { id: nextId++, name, price };
    teaData.push(newTea);

    res.status(201).json(newTea);
});


//get all tea
app.get('/teas', (req, res) => {
    res.json(teaData);
});


//get a tea with id
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))

    if(!tea){
        return res.status(404).send('Tea not found')
    }
    res.status(200).send(tea)
})
//update tea
app.put('/teas/:id', (req, res) => { 
    
    console.log("Request Params ID:", req.params.id); // Debug
    console.log("Request Body:", req.body); // Debug
    console.log("Current teaData:", teaData); // Debug // 🐞 Debugging step

    const tea = teaData.find(t => t.id === parseInt(req.params.id)); // ✅ Find the tea correctly
    if (!tea) {
        return res.status(404).send('Tea not found');
    }

    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).send('Name and price are required');
    }

    tea.name = name;
    tea.price = price;
    res.status(200).json(tea); // ✅ Use `.json()` for consistency
});

// DELETE TEA - FIXED
app.delete('/teas/:id', (req, res) => {
    console.log("Delete Request for ID:", req.params.id);
    console.log("Delete");
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id)); // ✅ Fix the missing "const index"
    
    if (index === -1) {
        return res.status(404).send('Tea not found');
    }

    teaData.splice(index, 1);
    return res.status(200).send('Deleted'); // ✅ No need to send 'deleted' for 204 status
});


//finally listening to the port
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}...`);
});

