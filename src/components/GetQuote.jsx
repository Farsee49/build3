import React, {Fragment, useEffect, useState} from "react";
import { getQuote } from "../axios/randomQuote";


export default function  GetQuote() {
    const [quote, setQuote] = React.useState([]);

    const getQuoteData = async () => {
        const result = await getQuote();
        const allQuotes = result.data;
       console.log(result.data);
       setQuote(allQuotes);
    }

    useEffect(() => {
        Promise.all([getQuoteData()]);
    }, []);
    
  
    
   
    console.log('Quote:', quote);
    return (
        <Fragment>
           
           {quote.map(quote =>
                <Fragment key={quote.id}>
                    <h2 className="text-center">{quote.content}</h2>
                    <p className="text-center">{quote.author}</p>
                </Fragment>)}
        </Fragment>
    )
}