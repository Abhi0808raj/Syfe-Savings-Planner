# **Goal-Based Savings Planner**

## **Tech Stack**

* React 18 \- Main framework  
* Vite \- Build tool  
* Tailwind CSS \- Styling  
* Exchange Rate API \- For currency conversion

## **How to run**

1. Clone this repo  
2. Install dependencies  
3. Start the dev server

## **Features I implemented**

Core Features:

* Add new goals with name, amount, and currency (INR/USD)  
* Display goals as cards with progress bars  
* Add contributions to goals through a modal  
* Real-time currency conversion using live exchange rates  
* Dashboard showing total target, total saved, and overall progress  
* Refresh exchange rate button  
* Delete goals  
* Form validation (no negative numbers, required fields, etc.)  
* Loading states while fetching data  
* Responsive design for mobile and desktop

Extra Features:

* Maximum goal limit (20 goals)  
* Prevent over-contributing (can't add more than remaining amount)  
* Shows exchange rate with last updated time  
* Currency symbols for better readability

## **Problems I faced**

1. **Tailwind not working** \- Fixed by adding it as a plugin in vite.config  
2. **Props not passing** \- Forgot parentheses in destructuring  
3. **Progress not updating** \- Had to convert contributions to goal currency first before calculating  
4. **Max goals limit** \- Logic issue

Full bug list in project\_docs/Bugs.txt

**Demo** 

https://syfe-savings-planner-kohl.vercel.app/

