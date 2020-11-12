import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Route, Switch, useParams } from 'react-router-dom';
import IncidentCard from './IncidentCard';
import DashboardChart from './DashboardChart';
import NavDashBoard from './NavDashboard';

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);

  const tempData = [
    {
      incident_id: 1,
      id: 'mn-minneapolis-14',
      city: 'Minneapolis',
      state: 'Minnesota',
      lat: 44.9481,
      long: -93.237,
      title: 'Police shoot flashbang grenades into crowd',
      desc:
        'Police on the rooftop of the 3rd precinct fire flashbang grenades into crowd of peaceful protesters.',
      date: '2020-05-26T05:00:00.000Z',
      continuum: 'less-lethal',
      verbalization: false,
      empty_hand_soft: false,
      empty_hand_hard: false,
      less_lethal_methods: true,
      lethal_force: false,
      uncategorized: false,
      categories: [],
      src: [],
    },
    {
      incident_id: 2,
      id: 'mn-minneapolis-28',
      city: 'Minneapolis',
      state: 'Minnesota',
      lat: 44.9413,
      long: -93.2626,
      title:
        'Man has his gun confiscated in an open carry state, violating his 2nd amendment rights',
      desc:
        'Man encounters police arresting people open carrying (~3 minutes in), man is then also put in handcuffs (~5 minutes in) and his gun taken.',
      date: '2020-05-26T05:00:00.000Z',
      continuum: 'abuse-of-power',
      verbalization: false,
      empty_hand_soft: false,
      empty_hand_hard: false,
      less_lethal_methods: false,
      lethal_force: false,
      uncategorized: true,
      categories: [],
      src: [],
    },
    {
      incident_id: 3,
      id: 'mn-minneapolis-21',
      city: 'Minneapolis',
      state: 'Minnesota',
      lat: 44.9479,
      long: -93.2349,
      title: 'Police hit press in neck and head with wooden baton',
      desc:
        'A group of cops start to approach a group of press taking photos and video. One press member repeats "we have our hands up and we have press passes". An officer walking by points in the direction of a photographer and says something indiscernable. The camera pans to show a cop hitting the photographer in the neck and head with a wooden baton.',
      date: '2020-05-26T05:00:00.000Z',
      continuum: 'baton',
      verbalization: false,
      empty_hand_soft: false,
      empty_hand_hard: false,
      less_lethal_methods: true,
      lethal_force: false,
      uncategorized: false,
      categories: [],
      src: [],
    },
    {
      incident_id: 4,
      id: '654403b0-156b-11eb-a46e-fb762f48fab1',
      city: 'Minneapolis',
      state: 'Minnesota',
      lat: 44.9778,
      long: -93.265,
      title: 'Police shoot flashbang grenades into crowd',
      desc: 'None',
      date: '2020-05-26T05:00:00.000Z',
      continuum: 'less-lethal',
      verbalization: false,
      empty_hand_soft: false,
      empty_hand_hard: false,
      less_lethal_methods: true,
      lethal_force: false,
      uncategorized: false,
      categories: [],
      src: [],
    },
    {
      incident_id: 5,
      id: '6537b170-156b-11eb-9a05-43449b932225',
      city: 'Minneapolis',
      state: 'Minnesota',
      lat: 44.9778,
      long: -93.265,
      title: 'Police hit press in neck and head with wooden baton',
      desc: 'None',
      date: '2020-05-26T05:00:00.000Z',
      continuum: 'baton',
      verbalization: false,
      empty_hand_soft: false,
      empty_hand_hard: false,
      less_lethal_methods: true,
      lethal_force: false,
      uncategorized: false,
      categories: [],
      src: [],
    },
    {
      incident_id: 6,
      id: '653ee2b0-156b-11eb-b242-f9e25f6eb571',
      city: 'Minneapolis',
      state: 'Minnesota',
      lat: 44.9778,
      long: -93.265,
      title:
        'Man has his gun confiscated in an open carry state, violating his 2nd amendment rights',
      desc: 'None',
      date: '2020-05-26T05:00:00.000Z',
      continuum: 'abuse-of-power',
      verbalization: false,
      empty_hand_soft: false,
      empty_hand_hard: false,
      less_lethal_methods: false,
      lethal_force: false,
      uncategorized: true,
      categories: [],
      src: [],
    },
    {
      incident_id: 7,
      id: 'co-denver-1',
      city: 'Denver',
      state: 'Colorado',
      lat: 39.7384,
      long: -104.986,
      title: 'Reporter shot with multiple pepper balls',
      desc:
        'He states the officer aimed at him, and the pepper balls broke his press badge and drew blood',
      date: '2020-05-28T05:00:00.000Z',
      continuum: 'less-lethal',
      verbalization: false,
      empty_hand_soft: false,
      empty_hand_hard: false,
      less_lethal_methods: true,
      lethal_force: false,
      uncategorized: false,
      categories: [],
      src: [],
    },
    {
      incident_id: 8,
      id: '67959200-156b-11eb-9050-d3d026aa4519',
      city: 'New York City',
      state: 'New York',
      lat: 40.7128,
      long: -74.006,
      title:
        'Police make violent arrests, officer breaks baton striking protester',
      desc: 'None',
      date: '2020-05-28T05:00:00.000Z',
      continuum: 'arrest',
      verbalization: false,
      empty_hand_soft: true,
      empty_hand_hard: false,
      less_lethal_methods: false,
      lethal_force: false,
      uncategorized: false,
      categories: [],
      src: [],
    },
    {
      incident_id: 9,
      id: 'ca-sanjose-2',
      city: 'San Jose',
      state: 'California',
      lat: 37.3382,
      long: -121.886,
      title: 'Police fire on community activist',
      desc:
        'A protester and community activist, known for work anti-bias and community building work with the San Jose PD, is fired upon by police. Though he has his hands in the air, police fire on him numerous times, striking him once in the groin. Later reports state the man suffered a ruptured testicle.',
      date: '2020-05-29T05:00:00.000Z',
      continuum: 'less-lethal',
      verbalization: false,
      empty_hand_soft: false,
      empty_hand_hard: false,
      less_lethal_methods: true,
      lethal_force: false,
      uncategorized: false,
      categories: [],
      src: [],
    },
    {
      incident_id: 10,
      id: 'ca-sanjose-1',
      city: 'San Jose',
      state: 'California',
      lat: 37.3382,
      long: -121.886,
      title: 'Police shoot a projectile at a protester',
      desc:
        'A police officer shoots a projectile at a protester for yelling out profanities. The same officer is seen excited about the protests yelling "let\'s get this motherfucker".',
      date: '2020-05-29T05:00:00.000Z',
      continuum: 'less-lethal',
      verbalization: false,
      empty_hand_soft: false,
      empty_hand_hard: false,
      less_lethal_methods: true,
      lethal_force: false,
      uncategorized: false,
      categories: [],
      src: [],
    },
    {
      incident_id: 11,
      id: 'ca-sanjose-3',
      city: 'San Jose',
      state: 'California',
      lat: 37.3386,
      long: -121.885,
      title: 'Officer puts knee on neck of protester',
      desc:
        "A police officer shoves aside another officer restraining a suspect so he can put his knee on the suspect's neck.",
      date: '2020-05-29T05:00:00.000Z',
      continuum: 'arrest',
      verbalization: false,
      empty_hand_soft: true,
      empty_hand_hard: false,
      less_lethal_methods: false,
      lethal_force: false,
      uncategorized: false,
      categories: [],
      src: [],
    },
    {
      incident_id: 12,
      id: 'ga-atlanta-1',
      city: 'Atlanta',
      state: 'Georgia',
      lat: 33.8487,
      long: -84.3628,
      title: 'Officer body slams woman onto ground',
      desc:
        'On May 29th, an officer slams a woman on to the ground, breaking her clavicle. The incident took place near Lenox Square mall in the Buckhead area of Atlanta.',
      date: '2020-05-29T05:00:00.000Z',
      continuum: 'shove',
      verbalization: false,
      empty_hand_soft: false,
      empty_hand_hard: true,
      less_lethal_methods: false,
      lethal_force: false,
      uncategorized: false,
      categories: [],
      src: [],
    },
    {
      incident_id: 13,
      id: 'ga-atlanta-2',
      city: 'Atlanta',
      state: 'Georgia',
      lat: 0,
      long: 0,
      title: 'Officer shoves a woman with his bike',
      desc:
        'Police officer is seen shoving two women off onto the side with his bicycle.',
      date: '2020-05-29T05:00:00.000Z',
      continuum: 'bike',
      verbalization: false,
      empty_hand_soft: false,
      empty_hand_hard: false,
      less_lethal_methods: false,
      lethal_force: false,
      uncategorized: true,
      categories: [],
      src: [],
    },
    {
      incident_id: 14,
      id: 'co-denver-13',
      city: 'Denver',
      state: 'Colorado',
      lat: 39.7384,
      long: -104.986,
      title: 'Police discharge tear gas into group of protesters',
      desc:
        'An officer is seen pointing to another officer, directing towards middle of protesters. The other officer is then seen throwng a tear gas canister underhanded into group of protesters. Sounds of projectiles are heard being shot after tear gas is discharge.',
      date: '2020-05-29T05:00:00.000Z',
      continuum: 'less-lethal',
      verbalization: false,
      empty_hand_soft: false,
      empty_hand_hard: false,
      less_lethal_methods: true,
      lethal_force: false,
      uncategorized: false,
      categories: [],
      src: [],
    },
    {
      incident_id: 15,
      id: 'tx-houston-1',
      city: 'Houston',
      state: 'Texas',
      lat: 0,
      long: 0,
      title: 'Police trample protester with horse',
      desc:
        'A mounted police officer in Houston trampled a woman with his horse. It appeared to be somewhat accidental, but the officer was riding the horse at a decent speed within feet of the protesters. The crowd had been making peaceful chants prior to the incident but became agitated afterwards.',
      date: '2020-05-29T05:00:00.000Z',
      continuum: 'horse',
      verbalization: false,
      empty_hand_soft: false,
      empty_hand_hard: false,
      less_lethal_methods: false,
      lethal_force: false,
      uncategorized: true,
      categories: [],
      src: [],
    },
    {
      incident_id: 16,
      id: 'co-denver-4',
      city: 'Denver',
      state: 'Colorado',
      lat: 39.7385,
      long: -104.986,
      title: 'Denver SWAT shoot at woman trying to stop armored car',
      desc:
        'A woman stops an armored SWAT car (marked APC01) on the corner of [Lincoln and 14th](https://www.google.com/maps/place/E+14th+Ave+%26+Lincoln+St,+Denver,+CO+80202,+USA/@39.7384949,-104.986315,18z).\nThree armored police get out from back of armored car. One walks around the side and shoots some projectile, hitting the ground in front of the woman.',
      date: '2020-05-29T05:00:00.000Z',
      continuum: 'less-lethal',
      verbalization: false,
      empty_hand_soft: false,
      empty_hand_hard: false,
      less_lethal_methods: true,
      lethal_force: false,
      uncategorized: false,
      categories: [],
      src: [],
    },
    {
      incident_id: 17,
      id: 'co-denver-3',
      city: 'Denver',
      state: 'Colorado',
      lat: 39.7401,
      long: -104.985,
      title: 'Denver law enforcement shoot at reporters',
      desc:
        'A reporter from Denver 7 news tweeted a photo showing one of their cameramen holding their camera with a bullet hole through its lens.  The caption states "Police just fired off paintballs and tear gas. Our photographer got hit four time and our camera got hit." (It later turned out that the projectile was a pepper ball, not a paintball.)',
      date: '2020-05-29T05:00:00.000Z',
      continuum: 'less-lethal',
      verbalization: false,
      empty_hand_soft: false,
      empty_hand_hard: false,
      less_lethal_methods: true,
      lethal_force: false,
      uncategorized: false,
      categories: [],
      src: [],
    },
    {
      incident_id: 18,
      id: 'co-denver-2',
      city: 'Denver',
      state: 'Colorado',
      lat: 39.7384,
      long: -104.986,
      title: 'Police pepper spray people trying to record',
      desc:
        'A man is filming police activity through his sunroof. An officer approaches, possibly strikes the person recording, and apparently pepper sprays into the car, blinding the driver and passenger. The driver is then told to move his car away. The officer also pepper sprays a second person recording in front of the car.',
      date: '2020-05-29T05:00:00.000Z',
      continuum: 'less-lethal',
      verbalization: false,
      empty_hand_soft: false,
      empty_hand_hard: false,
      less_lethal_methods: true,
      lethal_force: false,
      uncategorized: false,
      categories: [],
      src: [],
    },
    {
      incident_id: 19,
      id: 'ca-sanjose-4',
      city: 'San Jose',
      state: 'California',
      lat: 37.3396,
      long: -121.883,
      title:
        "Police knocks phone out of protester's hand; riot control measures follow",
      desc:
        "A protester can be seen filming SJPD officers' badge numbers. One officer swats the phone out of the protester's hand. The camera angle shifts, but the protester appears to retaliate by punching the officer.\n\nThe riot police retaliate against the entire protest, firing rubber bullets and tear gas.",
      date: '2020-05-29T05:00:00.000Z',
      continuum: 'less-lethal',
      verbalization: false,
      empty_hand_soft: false,
      empty_hand_hard: false,
      less_lethal_methods: true,
      lethal_force: false,
      uncategorized: false,
      categories: [],
      src: [],
    },
    {
      incident_id: 20,
      id: 'ca-sanjose-5',
      city: 'San Jose',
      state: 'California',
      lat: 37.3353,
      long: -121.889,
      title: 'Man struck by rubber bullet and explosive device',
      desc:
        "A protester filming receives water bottles from a car and begins to distribute them. Without warning, police fire into the crowd. The man is hit and is helped by a second protester. While the second protester is attempting to help, a canister explodes at the man's feet.",
      date: '2020-05-29T05:00:00.000Z',
      continuum: 'explosive',
      verbalization: false,
      empty_hand_soft: false,
      empty_hand_hard: false,
      less_lethal_methods: true,
      lethal_force: false,
      uncategorized: false,
      categories: [],
      src: [],
    },
    {
      incident_id: 21,
      id: 'tx-houston-2',
      city: 'Houston',
      state: 'Texas',
      lat: 0,
      long: 0,
      title: 'Officers shove a woman to the pavement',
      desc:
        'A large group of police officers were walking down the street when a woman standing near them was forcefully shoved to the ground by a police officer.',
      date: '2020-05-29T05:00:00.000Z',
      continuum: 'push',
      verbalization: false,
      empty_hand_soft: false,
      empty_hand_hard: true,
      less_lethal_methods: false,
      lethal_force: false,
      uncategorized: false,
      categories: [],
      src: [],
    },
    {
      incident_id: 22,
      id: 'ca-losangeles-37',
      city: 'Los Angeles',
      state: 'California',
      lat: 34.05,
      long: -118.258,
      title: 'Police use tear gas and riot rounds against protesters',
      desc:
        'In footage taken by a bystander filming from her apartment, police advance down a street near a Downtown LA shopping center. Protesters retreat from police. Police continuously fire less-lethal rounds and chemical agents at protesters. Towards the end of the footage, a single firework is thrown at police by protesters.',
      date: '2020-05-29T05:00:00.000Z',
      continuum: 'gas',
      verbalization: false,
      empty_hand_soft: false,
      empty_hand_hard: false,
      less_lethal_methods: true,
      lethal_force: false,
      uncategorized: false,
      categories: [],
      src: [],
    },
    {
      incident_id: 23,
      id: 'ny-newyorkcity-61',
      city: 'New York City',
      state: 'New York',
      lat: 40.6806,
      long: -73.9796,
      title:
        'Police chase and tackle protester, shove a second protester into a car',
      desc:
        'Footage taken at 67 5th Avenue in Brooklyn shows police chasing down a protester. They tackle the protester and hold them down to arrest. Another protester approaches and is thrown against the side of a car. This protester then falls to the ground and appears to be unconscious.',
      date: '2020-05-29T05:00:00.000Z',
      continuum: 'arrest',
      verbalization: false,
      empty_hand_soft: true,
      empty_hand_hard: false,
      less_lethal_methods: false,
      lethal_force: false,
      uncategorized: false,
      categories: [],
      src: [],
    },
    {
      incident_id: 947,
      id: '6fde5180-156b-11eb-a743-215738705335',
      city: 'Louisville',
      state: 'Kentucky',
      lat: 38.2527,
      long: -85.7585,
      title: 'Protester medic beaten and arrested',
      desc: 'None',
      date: '2020-06-19T05:00:00.000Z',
      continuum: 'arrest',
      verbalization: false,
      empty_hand_soft: true,
      empty_hand_hard: false,
      less_lethal_methods: false,
      lethal_force: false,
      uncategorized: false,
      categories: [],
      src: [],
    },
  ];

  useEffect(() => {
    setIncidents(tempData);
    // const getIncidents = () => {
    //   // axios
    //   //   .get('https://hrf-c-api.herokuapp.com/incidents/showallincidents', {
    //   //     params: {
    //   //       _limit: 10
    //   //     }
    //   //   })
    //   //   .then(res => {
    //   //     setIncidents(res.data);
    //   //   })
    //   //   .catch(err => {
    //   //     console.error('server error', err);
    //   //   });

    // };

    // getIncidents();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashbaord-nav">
        <NavDashBoard />

        <Switch>
          <Route path="/dashboard-chart">
            <DashboardChart />
          </Route>
          {/* <Route path="/dashboard"><Dashboard/></Route> */}
        </Switch>
      </div>

      <div className="incident-list">
        {incidents.map(incident => (
          <IncidentDetails key={incident.id} incident={incident} />
        ))}
      </div>
    </div>
  );
};

function IncidentDetails({ incident }) {
  return (
    <div className="incident-card">
      <IncidentCard incident={incident} />
    </div>
  );
}
export default Dashboard;
