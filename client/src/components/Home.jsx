import React from "react"
import FormCard from "./formCard"
import Grid from '@mui/material/Grid'

function Home(){ 
    return (

        <Grid container spacing={2}>
            {
                forms.map((form) =>
                <Grid key={form._id} item xs={6} sm={4} md={2}>
                <FormCard
                    key={form._id}
                    firstName={form.firstName}
                    email={form.email}
                    phoneNum={form.phoneNum}
                    dob={form.dob}
                />
                </Grid>
                )
            }
        </Grid>
    )
}

export default Home