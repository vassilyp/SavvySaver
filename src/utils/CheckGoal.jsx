import transactions from "../otherTransactions.json";
import { CohereClient } from "cohere-ai";
import { useState } from "react";
import secrets from "../secrets.json";
import { useEffect } from "react";



export const CheckGoal = () => {

    const [isGoalReached, setIsGoalReached] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const challenge = "Spend less that $10000000 on Starbucks";


    const stringData = JSON.stringify(transactions);


    const prompt = `Given this prompt: ${challenge} and this data: ${stringData} / Did the user reach their goal? Respond only with one word. If they did not spend over their threshold, response "Yes". If they did spend over their threshold, response "No"`;
    const preamble = "You are a financial advisor at the most prestigious financial institution and sharing your knowledge with a youth that wants to get support with their budgeting and investing. Use your general knowledge, do not refer to the documents."


    const generateChallengeTitles = async () => {
        setLoading(true)
        const cohere = new CohereClient({
          token: secrets.COHERE_API_KEY,
        });
    
        const response = await cohere.chat({
          message: prompt,
          model: "command-r-plus",
          preamble: preamble,
        });

        const result = response.text.trim().toLowerCase();
        setIsGoalReached(result === "yes")
    

  
        setLoading(false);  
      };

      useEffect(() => {
        generateChallengeTitles();
      },[])
      

      return {isLoading, isGoalReached}
      
}