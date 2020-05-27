import React, {useEffect, useState} from 'react';
import JobListing from '../../components/JobListingComponents/ListingDisplay';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer';
import axios from 'axios';

const JobListingPage = () => {
  const [jobData, setJobData] = useState([])
  useEffect(() => {

     axios.get('http://localhost:8000/api/jobs')
     .then((res) => {

      setJobData(res.data.data)

    }); 
  
    },[]

    );

    return (
      <div className="App">
        <Header />
        {jobData.map((job) => {
        return <JobListing job={job}/>
        
        })};
       
        <Footer />
      </div>
    );
  
};

export default JobListingPage;