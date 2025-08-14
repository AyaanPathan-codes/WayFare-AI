import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";


const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey);

const model=genAI.getGenerativeModel({
    model:"gemini-2.5-flash"
});

const generationConfig = {
    temperature : 1,
    topP :0.95,
    topK: 64,
    maxOutputTokens : 8192,
    responseMimeType: "application/json",
};



export const chatSession = model.startChat({
        generationConfig,
        history:[
            {
                role:"user",
                parts:[
                    {text:"Generate travel plan for Las Vegas for 3 days for Couple with a Cheap budget, Give me a Hotels options with  hotel img url,geo coordinates, rating, description, and suggest itinerary with placeName, Price Details, Place Img Url, Geo Coordinates, ticket Pricing, rating, Time travel each of location for  days with each day plan with best time to visit in JSON format"

                },
            ],
            },
            {
                role: 'model',
             parts: [
        {
          text: `**Devising a Budget Itinerary**

I'm working on crafting a cost-effective 3-day Las Vegas itinerary for a couple. My focus is on finding budget-friendly hotel options, and I'm gathering data like image URLs, geo-coordinates, ratings, and descriptions to ensure informed choices. Parallel to that, I'm researching affordable activities and attractions. I aim to create a detailed itinerary with pricing, location data, images, ratings, and time considerations.


**Crafting the Itinerary Structure**

I've outlined the basic structure of the 3-day Las Vegas itinerary, focusing on budget-conscious activities. I've broken it down by day, incorporating hotel check-in on Day 1, exploring the Strip and free attractions on Day 2, and concluding with departure on Day 3 or exploring local gems if time allows. Now, my next step is to research hotel options and specific activities that fit this framework, ensuring the budget stays tight.


**Defining Itinerary Parameters**

I'm now fully immersed in the nitty-gritty, specifying the budget-conscious activities and accommodations. My core task is to identify and compile the required data points for each hotel and attraction: the image URLs (with a note about the inherent challenge of image URLs stability), geo-coordinates, ratings, descriptions, ticket prices, and estimated travel times. The structured JSON format necessitates a meticulous approach to data gathering, and I'm aiming to keep the itinerary simple and flexible, considering the limitations of a short trip.


**Formulating Data Search Strategies**

I've outlined the structure for the JSON output and am now focusing on data acquisition. My approach involves a focused strategy: identifying budget hotels and free attractions using specific search queries. For hotels, I'm using queries like "cheap hotels Las Vegas couple" and "best budget hotels Las Vegas strip." I will then refine those hotels with specific queries like "hotel name Las Vegas rating" and "hotel name Las Vegas geo coordinates." For attractions, I am looking into "free things to do Las Vegas couple" and "cheap attractions Las Vegas." I am meticulously planning the specific queries for each data point to optimize the data gathering process. My goal is to maximize efficiency.


**Structuring the Data Acquisition**

I'm now fully immersed in the data acquisition phase, having outlined the structured itinerary and the necessary JSON format. My current focus is on building the search queries to gather the required data points for budget hotels and attractions. I'm prioritizing accuracy and relevance in my queries, ensuring a detailed and informative itinerary. The challenge lies in efficiently finding current information, especially for attraction timings and pricing, while keeping the budget constraints in mind. I've noted the need to provide image search queries rather than direct URLs. I'm feeling confident about the plan, but I need to remain agile to handle data inconsistencies and potential changes in attraction availability.


**Analyzing Vegas Budget Options**

I'm structuring the budget-friendly Vegas options I found. I'm focusing on hotels with positive reviews, descriptions and amenities that meet budget criteria. I'll make sure to get the right JSON format. I am also investigating free and low-cost things to do, and I'll see what the best way to present them is.


**Formatting JSON Data**

I've completed the initial selection of budget-friendly hotels, pinpointing several options with positive reviews. My next step involves verifying descriptions and ratings for these choices, and I'll include geo-coordinates and a search query for images. I've also identified several free or low-cost activities and will shape this into a coherent itinerary. I'm focusing on the best way to format all this information into the specified JSON structure.


**Compiling Data & Activities**

I've gathered details on several budget-friendly hotels, including Horseshoe Las Vegas, and compiled a list of free and low-cost activities.  I'm now determining pricing, transportation, and scheduling recommendations, preparing to integrate these elements into a cohesive itinerary for the specified JSON format. I will be refining data for each hotel and each activity.


**Compiling Itinerary Details**

I've completed my hotel research and have descriptions, ratings, and will get geo-coordinates and image search queries. I'm focusing on the best free attractions on The Strip and downtown Las Vegas, like the Bellagio Fountains, the Fremont Street Experience, and the Flamingo Wildlife Habitat. I am still working on travel costs and the best times to visit each attraction, aiming for a detailed, budget-friendly itinerary in the correct JSON format.


**Compiling Final JSON Data**

I've completed the initial structure of my JSON data, incorporating the selected budget hotels (Horseshoe, Flamingo, Excalibur) with their descriptions, ratings, and image search queries. I've also formatted the free and low-cost attractions into the itinerary, including time estimates and transportation details. My focus now is on final formatting and ensuring all information adheres perfectly to the required JSON structure.


**Constructing the JSON Structure**

I've completed refining hotel data, confirming geo-coordinates and search queries. I've also finalized the activity details, including durations and optimal visit times for each attraction. Now, I'm focusing on structuring all this information into the required JSON format, ensuring a clear and concise representation of the budget-friendly Las Vegas itinerary. I'm focusing on ensuring data integrity.


**Finalizing JSON Structure**

I'm in the final phase of structuring the JSON data, ensuring that all hotel and attraction details, including ratings, descriptions, geo-coordinates, time estimates, and transportation, are formatted precisely according to the required structure. I've re-reviewed the JSON formatting guide, ensuring all data types and field names align perfectly with the specification. The final check aims to make sure all of the data aligns.


**Organizing Data into JSON**

I've completed my research, including hotel descriptions, ratings, image search queries, and attraction details. I'm actively structuring the data into the specified JSON format, focusing on clear organization and accuracy. I'm adding geo-coordinates and transportation details to each activity entry and each hotel entry. The goal is to ensure a user-friendly and easily digestible itinerary. I am almost ready to submit.


`,
        },
        {
          text: `\`\`\`json
{
  "las_vegas_travel_plan": {
    "title": "Las Vegas Getaway for Two: Budget-Friendly 3-Day Itinerary",
    "couple_focused": true,
    "budget": "Cheap (focus on free/low-cost activities)",
    "hotels": [
      {
        "name": "Horseshoe Las Vegas Hotel & Casino",
        "image_search_query": "Horseshoe Las Vegas Hotel & Casino exterior",
        "geo_coordinates": {
          "latitude": 36.1147,
          "longitude": -115.1706
        },
        "rating": "4 out of 5",
        "description": "Located in the heart of the Strip, Horseshoe Las Vegas offers a classic Vegas experience with a casino, multiple restaurants, and a pool. It's a business-friendly resort. [28]"
      },
      {
        "name": "Flamingo Las Vegas Hotel & Casino",
        "image_search_query": "Flamingo Las Vegas Hotel & Casino exterior",
        "geo_coordinates": {
          "latitude": 36.1166,
          "longitude": -115.1717
        },
        "rating": "3.5 out of 5",
        "description": "An iconic, vibrant hotel on the Strip known for its pink facade and the Flamingo Wildlife Habitat, which is a free attraction. [6, 12, 28, 30]"
      },
      {
        "name": "Excalibur Hotel & Casino",
        "image_search_query": "Excalibur Hotel & Casino exterior",
        "geo_coordinates": {
          "latitude": 36.0988,
          "longitude": -115.1751
        },
        "rating": "3.5 out of 5",
        "description": "A medieval-themed resort located at the south end of the Strip, offering budget-friendly accommodations and a fun atmosphere. [30]"
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "theme": "Arrival & Downtown Delights",
        "plan": [
          {
            "place_name": "Hotel Check-in",
            "price_details": "Varies by hotel and booking, aim for budget-friendly rates.",
            "place_image_search_query": "Hotel room Las Vegas budget",
            "geo_coordinates": "Refer to selected hotel's coordinates",
            "ticket_pricing": "N/A",
            "rating": "N/A",
            "time_travel_duration": "1-2 hours (check-in process, settling in)",
            "best_time_to_visit": "Afternoon (standard check-in time)"
          },
          {
            "place_name": "Fremont Street Experience",
            "price_details": "Free to walk around and enjoy the shows; food/drinks at your own expense.",
            "place_image_search_query": "Fremont Street Experience Las Vegas",
            "geo_coordinates": {
              "latitude": 36.1706,
              "longitude": -115.1432
            },
            "ticket_pricing": "Free for general access and light shows. [6, 19]",
            "rating": "Highly Recommended",
            "time_travel_duration": "3-4 hours",
            "best_time_to_visit": "Evening (for Viva Vision light shows, live music, and street performers). Shows run every hour and last about six minutes. [19]"
          },
          {
            "place_name": "Dinner in Downtown Las Vegas",
            "price_details": "Budget-friendly options available in Downtown. Estimate $20-$40 per person.",
            "place_image_search_query": "Downtown Las Vegas affordable food",
            "geo_coordinates": "Near Fremont Street Experience",
            "ticket_pricing": "N/A",
            "rating": "Varies by restaurant",
            "time_travel_duration": "1.5 hours",
            "best_time_to_visit": "Evening"
          }
        ]
      },
      {
        "day": 2,
        "theme": "Las Vegas Strip Wonders (Free & Low Cost)",
        "plan": [
          {
            "place_name": "Bellagio Conservatory & Botanical Gardens",
            "price_details": "Free.",
            "place_image_search_query": "Bellagio Conservatory & Botanical Gardens",
            "geo_coordinates": {
              "latitude": 36.1126,
              "longitude": -115.1767
            },
            "ticket_pricing": "Free. [6, 15]",
            "rating": "Excellent",
            "time_travel_duration": "1-1.5 hours",
            "best_time_to_visit": "Morning (to avoid crowds). [14]"
          },
          {
            "place_name": "Bellagio Fountains Show",
            "price_details": "Free.",
            "place_image_search_query": "Bellagio Fountains Show",
            "geo_coordinates": {
              "latitude": 36.1126,
              "longitude": -115.1767
            },
            "ticket_pricing": "Free. [6, 12]",
            "rating": "Spectacular",
            "time_travel_duration": "15-30 minutes (per show cycle, can watch multiple)",
            "best_time_to_visit": "Daytime or Evening (shows run every half hour from 3pm-8pm, then every 15 minutes until midnight). [11]"
          },
          {
            "place_name": "Stroll The LINQ Promenade",
            "price_details": "Free to walk around. Attractions like High Roller Observation Wheel and Fly LINQ Zipline cost extra if desired.",
            "place_image_search_query": "LINQ Promenade Las Vegas",
            "geo_coordinates": {
              "latitude": 36.1166,
              "longitude": -115.1717
            },
            "ticket_pricing": "Free to stroll. High Roller tickets start around $18, Fly LINQ Zipline around $44. [18]",
            "rating": "Good",
            "time_travel_duration": "1-2 hours",
            "best_time_to_visit": "Anytime, lively in the evening."
          },
          {
            "place_name": "Flamingo Wildlife Habitat",
            "price_details": "Free.",
            "place_image_search_query": "Flamingo Wildlife Habitat Las Vegas",
            "geo_coordinates": {
              "latitude": 36.1166,
              "longitude": -115.1717
            },
            "ticket_pricing": "Free. [6, 12]",
            "rating": "Good for nature lovers",
            "time_travel_duration": "1 hour",
            "best_time_to_visit": "Daytime."
          },
          {
            "place_name": "Explore The Strip on Foot (Window Shopping & Iconic Hotels)",
            "price_details": "Free (excluding any personal purchases).",
            "place_image_search_query": "Las Vegas Strip walking",
            "geo_coordinates": "Along Las Vegas Boulevard South",
            "ticket_pricing": "Free. [15]",
            "rating": "Iconic",
            "time_travel_duration": "2-3 hours (focus on a section)",
            "best_time_to_visit": "Afternoon/Evening to see the lights."
          }
        ]
      },
      {
        "day": 3,
        "theme": "Local Gems & Departure",
        "plan": [
          {
            "place_name": "Pinball Hall of Fame",
            "price_details": "Free admission; pay per game (quarters needed).",
            "place_image_search_query": "Pinball Hall of Fame Las Vegas",
            "geo_coordinates": {
              "latitude": 36.0934,
              "longitude": -115.1782
            },
            "ticket_pricing": "Free admission, games cost quarters. [6]",
            "rating": "Fun, unique",
            "time_travel_duration": "1.5-2 hours",
            "best_time_to_visit": "Morning/Early Afternoon (less crowded)"
          },
          {
            "place_name": "Downtown Container Park",
            "price_details": "Free entry; food/drinks/shopping at your own expense.",
            "place_image_search_query": "Downtown Container Park Las Vegas",
            "geo_coordinates": {
              "latitude": 36.1685,
              "longitude": -115.1408
            },
            "ticket_pricing": "Free to enter. [6, 11]",
            "rating": "Unique, eclectic",
            "time_travel_duration": "1.5-2 hours",
            "best_time_to_visit": "Late morning/Afternoon, before heading to airport or for a casual lunch."
          },
          {
            "place_name": "Atomic Liquors (Optional - for a historic drink)",
            "price_details": "Cost of drinks (average cocktail price).",
            "place_image_search_query": "Atomic Liquors Las Vegas",
            "geo_coordinates": {
              "latitude": 36.1668,
              "longitude": -115.1354
            },
            "ticket_pricing": "N/A",
            "rating": "Historic, unique bar",
            "time_travel_duration": "1-1.5 hours",
            "best_time_to_visit": "Evening (if staying longer, or for an early evening drink before heading to the airport)."
          },
          {
            "place_name": "Departure from Las Vegas",
            "price_details": "Varies by flight ticket.",
            "place_image_search_query": "Las Vegas airport",
            "geo_coordinates": {
              "latitude": 36.0840,
              "longitude": -115.1537
            },
            "ticket_pricing": "N/A",
            "rating": "N/A",
            "time_travel_duration": "3 hours (including travel to airport and check-in/security)",
            "best_time_to_visit": "Based on flight schedule."
          }
        ]
      }
    ],
    "transportation_notes": "For a cheap budget, consider using the RTC bus system (The Deuce or Strip & Downtown Express). A 3-day pass costs $20.00. [8, 34, 43] Children 5 and under ride free. [34]"
  }
}
\`\`\``,
        },
      ],
            }
        ]
    })
