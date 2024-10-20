import { useState, useEffect, useRef } from 'react';
import AnimatePage from '../components/AnimatePage';
import { getFromStorage, setToStorage } from '../helper/localStorage';
import Router from "next/router";
import { v4 as uuidv4 } from 'uuid';

export default function Signin() {
    const [name, setName] = useState('');
    const adInitialized = useRef(false); // Ref to track if the ad has been initialized
    const fundingChoicesInitialized = useRef(false); // Ref to track if the Funding Choices has been initialized

    useEffect(() => {
        if (!(typeof getFromStorage('player-name') === 'undefined' ||
            getFromStorage('player-name') === null ||
            getFromStorage('player-name') === '')) {
            Router.push('/');
        }
    }, []);

    useEffect(() => {
        // Load the AdSense script only once
        if (!adInitialized.current) {
            const script = document.createElement('script');
            script.async = true;
            script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
            script.setAttribute("data-ad-client", "ca-pub-2086544123628687");
            script.crossOrigin = "anonymous";
            document.body.appendChild(script);

            // Initialize ads after script is loaded
            script.onload = () => {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            };

            adInitialized.current = true; // Mark that the ad has been initialized
        }
    }, []);

    useEffect(() => {
        // Load the Funding Choices script only once
        if (!fundingChoicesInitialized.current) {
            const fundingScript = document.createElement('script');
            fundingScript.async = true;
            fundingScript.src = "https://fundingchoicesmessages.google.com/i/pub-2086544123628687?ers=1";
            document.body.appendChild(fundingScript);

            const inlineScript = document.createElement('script');
            inlineScript.innerHTML = `(function() {
                function signalGooglefcPresent() {
                    if (!window.frames['googlefcPresent']) {
                        if (document.body) {
                            const iframe = document.createElement('iframe');
                            iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;';
                            iframe.style.display = 'none';
                            iframe.name = 'googlefcPresent';
                            document.body.appendChild(iframe);
                        } else {
                            setTimeout(signalGooglefcPresent, 0);
                        }
                    }
                }
                signalGooglefcPresent();
            })();`;
            document.body.appendChild(inlineScript);

            fundingChoicesInitialized.current = true; // Mark that the Funding Choices has been initialized
        }
    }, []);

    const handleSubmit = (event, action = '') => {
        if (event.key === 'Enter' || action === 'click') {
            if (!name.replace(/\s/g, '').length || name === '') {
                alert('Enter your name')
            } else if (name.length >= 12) {
                alert('Your name is longer than 11 characters, Please try again.')
            } else {
                setToStorage('player-name', name);
                setToStorage('player-id', uuidv4());
                const record = {
                    wins: 0,
                    loses: 0,
                    draws: 0,
                    total: 0,
                    winRate: 0
                }
                setToStorage('player-record', JSON.stringify(record))
                Router.push('/');
            }
        }
    }

    return (
        <AnimatePage>
            <div className='signin grid place-items-center font-sans max-w-4xl mx-auto h-screen'>
                <div className='pt-9 pb-6 px-10 xs:px-8 xs:w-11/12 
                sm:w-10/12 w-7/12 md:7/12 rounded-md'>
                    <div className='mb-2 font-light text-lg'>
                        Enter your name
                    </div>
                    <div className='d-block'>
                        <input
                            type='text'
                            className='text-black font-medium w-full p-2 rounded-sm'
                            onKeyPress={e => handleSubmit(e)}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className='footer d-block w-full flex xs:justify-center justify-end mt-5'>
                        <button onClick={e => handleSubmit(e, 'click')} className='bg-gradient-shadow relative rounded-full xs:w-full px-7 py-2 bg-gradient-to-tr from-[#2475C5] via-[#39527B] to-[#206ABD] text-base font-medium text-white hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-offset-0 focus:ring-[#206ABD]'>Submit</button>
                    </div>
                </div>

                {/* AdSense Block */}
                <div>
                    <ins className="adsbygoogle"
                        style={{ display: 'block', width: '100%', height: 'auto', minWidth: '300px', minHeight: '250px' }}
                        data-ad-client="ca-pub-2086544123628687"
                        data-ad-slot="7029626634"
                        data-ad-format="auto"
                        data-full-width-responsive="true">
                    </ins>
                </div>
            </div>
        </AnimatePage>
    )
}
