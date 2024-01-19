import { useState } from 'react';
import { OpenAI } from 'openai';

const apiKey = "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";
const openai = new OpenAI({ 
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
 }); // Initialize OpenAI instance

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const completion = await openai.completions.create({
      model: "text-embedding-ada-002",
      prompt: input,
      max_tokens: 30,
    });
    console.log(completion.choices[0]);

    setOutput(completion.choices[0].text);
  }

  return (
    <div className='bg-gray-900 text-gray-100 h-screen flex flex-col dark:bg-gray-800 dark:text-gray-50'>
      <div className='flex-1 overflow-y-scroll'>
        <div className='flex justify-end my-2 mr-2'>
          <div className='bg-green-500 rounded-lg px-4 py-2 text-black max-w-sm'>
            Hi there, how can I help you today?
          </div>
        </div>
        <div className='flex justify-start my-2 ml-2'>
          <div className='bg-gray-300 rounded-lg px-4 py-2 text-black'>
            Hi, can you give me some information about OpenAI?
          </div>
        </div>
        {
          output ? (
            <div className='flex justify-end my-2 mr-2'>
              <div className='bg-green-500 rounded-lg px-4 py-2 text-black max-w-sm'>
                {output}
              </div>
            </div>
          ) : null
        }
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex items-center'>
          <input 
          type="text" 
          className='w-full border rounded-lg py-2 px-4 dark:bg-gray-700 dark:text-gray-200'
          value={input}
          onChange={(e)=> setInput(e.target.value)}
          placeholder='Type a message'/>
          <button type='submit' className='bg-green-500 hover:bg-greey-600 rounded-lg px-4 py-2 text-white ml-2'>Send</button>
        </div>
      </form>
    </div>
  );
}

export default App;
