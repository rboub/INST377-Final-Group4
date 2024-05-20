const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 3000;

// Initialize Supabase client
const supabaseUrl = 'https://zzvekvcooximzhxfjivi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6dmVrdmNvb3hpbXpoeGZqaXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYxNjkyMTMsImV4cCI6MjAzMTc0NTIxM30.OeLMkdGwiBnIfGUp5N1yo54jedgZAznK32LKbYLc3Ig';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

// Retrieve Data Endpoint
app.get('/api/retrieve-data', async (req, res) => {
    try {
        // Example: Retrieve data from a "anime" table
        const { data, error } = await supabase.from('anime').select('*');

        if (error) {
            throw error;
        }

        res.json(data);
    } catch (error) {
        console.error('Error retrieving data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Write Data Endpoint
app.post('/api/write-data', async (req, res) => {
    try {
        // Example: Write data to a "search_history" table
        const { searchTerm } = req.body;
        const { data, error } = await supabase.from('search_history').insert({ term: searchTerm });

        if (error) {
            throw error;
        }

        res.status(201).json({ message: 'Data written successfully.' });
    } catch (error) {
        console.error('Error writing data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
