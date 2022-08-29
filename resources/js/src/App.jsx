import { Card, CardContent, Container, Typography } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
    return (
        <Container>
            <Card>
                <CardContent>
                    <Typography>asdasd</Typography>
                </CardContent>
            </Card>
        </Container>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
