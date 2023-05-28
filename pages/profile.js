import React from "react";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import { Chrono } from "react-chrono";
// import { MDBContainer } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import axios from "axios"
import 'flowbite';


const baseURL = "http://127.0.0.1:5000";


function Profile() {
    const [eventList, setEventList] = useState([]);

    const fetchEvents = async () =>
    {
        const resp = await axios({
            method:"get",
            url:`${baseURL}/events`,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
        console.log('EVENTS.data', resp.data)
        setEventList(resp.data["events"]);
    } 

    useEffect(() => {
        fetchEvents();
      }, []);
    

  return (
    <>

      <Navbar transparent />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">

                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                    </div>
                    </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  </div>
                </div>
                <div>
                    <Timeline>                  
                        {eventList.map(event => {
                            return (
                                <Timeline.Item>
                                    <Timeline.Point />
                                    <Timeline.Content>
                                    <Timeline.Time>
                                        {event.title}
                                    </Timeline.Time>
                                    <Timeline.Title>
                                        {event.cardTitle}
                                    </Timeline.Title>
                                    <Timeline.Body>
                                        {event.cardDetailedText}
                                    </Timeline.Body>
                                    </Timeline.Content>
                              </Timeline.Item>
                                // <li class="mb-10 ml-4">
                                //     <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                //     <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{event.title}</time>
                                //     <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{event.cardTitle}</h3>
                                //     <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{event.cardDetailedText}</p>
                                // </li>   
                            )
                        })}
                    </Timeline>
                </div>
                {console.log("EventList:", eventList)}
                {/* <div className="App">
                    <div style={{ width: "100%", height: "100%" } }>
                        <Chrono items={eventList} mode="VERTICAL"  scrollable
                        theme={{
                            primary: '#537188',
                            secondary: '#E1D4BB',
                            // cardBgColor: '#EEEEEE',
                    }} />
                    {console.log("EventList:", eventList)}
                    </div>
                </div> */}

              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Profile;