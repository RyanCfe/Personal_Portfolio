const projects = {
  decidex: {
    title: 'DecideX',
    type: 'Android app / Decision making',
    intro: 'A way to slow down a decision when every option feels equally good or bad.',
    why: 'I kept thinking about how a recommendation can sound certain while hiding the reasons behind it. I wanted an app where the result was something you could question and understand.',
    work: [
      'The app lets someone set criteria, rate options and add mood and urgency. I worked on the scoring, the result breakdown and a history of earlier decisions.',
      'The main challenge was explaining the score on a small screen. A number on its own is not much help unless you can see which criteria pushed it up or down.'
    ],
    learned: 'It made me think harder about how a product explains its logic to the person using it.',
    stack: 'Kotlin · Firebase · SQLite',
    status: 'Public repository on GitHub',
    repository: 'https://github.com/RyanCfe/DecideX'
  },
  playgroundhq: {
    title: 'PlaygroundHQ',
    type: 'Real time / Game prototype',
    intro: 'A multiplayer playground with login, rooms and live game events.',
    why: 'A single-player page only has to keep track of one person. I wanted to see what changes when several people share the same space and act at the same time.',
    work: [
      'I worked with Express, Socket.IO and Firebase on rooms, login and events that reach the other players as they happen.',
      'Keeping the shared state in sync was the difficult bit. Two people can make a move almost together, and the screen still needs to make sense for both of them.'
    ],
    learned: 'Real-time code made timing and state feel like actual design problems, not just terms in a lesson.',
    stack: 'JavaScript · Express · Socket.IO · Firebase',
    status: 'Game prototype'
  },
  bmc: {
    title: 'BMC movie platform',
    type: 'Full stack / Systems',
    intro: 'A movie platform built across a frontend, API, database and web server.',
    why: 'I love films, so working on a movie platform gave the system a purpose I actually cared about. I also wanted to see what it takes for all the pieces of a web app to run and talk to one another.',
    work: [
      'I connected a Next.js frontend, FastAPI backend, PostgreSQL database and Nginx with Docker Compose.',
      'The hard part was tracing a request through the layers when something failed. A page error could start with routing, an API response or the database connection.'
    ],
    learned: 'This is the project that pulled me toward Linux and cloud. I want to understand what happens after the app works on my laptop.',
    stack: 'Next.js · FastAPI · PostgreSQL · Nginx · Docker Compose',
    status: 'Private repository · Full-stack project'
  },
  savedlinks: {
    title: 'Saved links extension',
    type: 'Browser / Side project',
    intro: 'A small utility for posts I wanted to revisit but kept losing.',
    why: 'Links from Instagram and X kept ending up across bookmarks and chats. I wanted one quick place to save them while browsing.',
    work: [
      'I tried a browser extension with a simple save-and-find flow for those links.',
      'The important part was keeping it quick. If saving a post takes more effort than sending it to myself, the extension misses the point.'
    ],
    learned: 'Small tools still need a clear reason to exist and an interaction that fits the way someone already behaves.',
    stack: 'JavaScript · Browser extension APIs',
    status: 'Side project prototype'
  },
  goldetf: {
    title: 'Gold ETF comparison',
    type: 'Finance / Team analysis',
    intro: 'Comparing three Indian Gold ETFs without reducing the choice to one return figure.',
    why: 'A fund can look like the obvious winner until you change the measure. Our team wanted to compare HDFC, SBI and Nippon India Gold BeES across more than one angle.',
    work: [
      'We looked at returns, volatility, Sharpe ratio and liquidity, then put the results side by side so the trade-offs were visible.',
      'The useful question became “best for what?” A comparison has to say whether it values return, steadier performance or the ease of buying and selling.'
    ],
    learned: 'I enjoyed the point where the calculations turned into a decision someone could actually discuss.',
    stack: 'Excel · Python · Tableau',
    status: 'Team analysis'
  },
  netflix: {
    title: 'Netflix analytics',
    type: 'Database / API / Dashboard',
    intro: 'A catalogue dataset turned into related tables, API endpoints and a dashboard.',
    why: 'I wanted to do more than count titles in a spreadsheet. Questions about genres, people and countries become more interesting when the data is organised properly.',
    work: [
      'I started with a flat dataset, separated the entities into related tables and built endpoints and a dashboard to explore them.',
      'The database design was a big part of the work. If the relationships are messy, even a good-looking chart can answer the wrong question.'
    ],
    learned: 'This helped me see the difference between having data and making it useful to query.',
    stack: 'Python · SQLite · FastAPI · Streamlit',
    status: 'Public repository on GitHub',
    repository: 'https://github.com/RyanCfe/Netflix-analytics-dashboard'
  },
  iris: {
    title: 'Iris prediction API',
    type: 'Machine learning / Backend',
    intro: 'A classification model made available through a Django REST endpoint.',
    why: 'Training a model in a notebook is one step. I wanted to see what changes when another application has to send it input and get a dependable answer back.',
    work: [
      'I trained a model using four flower measurements and built an endpoint that accepts those values and returns a species prediction as JSON.',
      'I also worked with input validation, authentication and PostgreSQL. The surrounding API matters because a model cannot quietly assume every request is clean.'
    ],
    learned: 'It connected the ML work I study with the backend work needed to make a prediction usable.',
    stack: 'Python · scikit-learn · Django REST · PostgreSQL',
    status: 'ML and API project'
  },
  cityflow: {
    title: 'CityFlow',
    type: 'Data / Scenario visualisation',
    intro: 'A fictional commuter route that changes as demand and capacity change.',
    why: 'Living in Mumbai makes it hard to ignore how differently a route feels at different hours. I wanted to make the relationship between demand and capacity visible, even with a simplified example.',
    work: [
      'I used a simulated daily pattern and sliders for average demand and capacity. The SVG chart redraws for each choice and counts the time slots above capacity.',
      'The numbers are deliberately fictional; this is an exploration of the relationship, not a forecast of an actual route.'
    ],
    learned: 'A chart becomes more useful when someone can change an assumption and immediately see what that does to the conclusion.',
    stack: 'JavaScript · SVG · Simulated data',
    status: 'Data visualisation project'
  },
  clusterlab: {
    title: 'Cluster Lab',
    type: 'Machine learning / K-means visualisation',
    intro: 'A way to watch k-means clustering change one step at a time.',
    why: 'I understood the definition of a centroid before I really understood what it was doing. Moving points around made the algorithm much easier to follow.',
    work: [
      'I built a board where points can be placed and the number of groups can be changed. Each step assigns points to their nearest centroid, then moves each centroid to the average of its group.',
      'The sample points make it possible to see how a different starting position can lead to a different result.'
    ],
    learned: 'Seeing the assignments and centres move helped turn the formula into something I could explain.',
    stack: 'JavaScript · SVG · K-means',
    status: 'ML visualisation project'
  },

};

const slug = new URLSearchParams(window.location.search).get('project');
const project = projects[slug];
const byId = id => document.getElementById(id);

if (!project) {
  document.title = 'Project not found / Ryan N.';
  byId('detail-title').textContent = 'Wrong turn.';
  byId('detail-description').textContent = 'That project is not in the archive.';
  byId('project-content').hidden = true;
} else {
  document.title = `${project.title} / Ryan N.`;
  byId('detail-kind').textContent = project.type;
  byId('detail-title').textContent = project.title;
  byId('detail-description').textContent = project.intro;
  byId('project-status').textContent = project.status;
  if (project.repository) {
    const link = document.createElement('a');
    link.href = project.repository;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = ' View code on GitHub ↗';
    byId('project-status').append(link);
  }
  byId('project-why').textContent = project.why;
  byId('project-learned').textContent = project.learned;
  byId('project-stack').textContent = project.stack;
  project.work.forEach(paragraph => {
    const p = document.createElement('p');
    p.textContent = paragraph;
    byId('project-work').append(p);
  });
}
