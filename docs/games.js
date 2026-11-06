const games = [
  {
    title: 'VALORANT',
    page: 'valorant.html',
    cover: 'valorant-cover.webp',
    genre: 'Tactical shooter',
    detail: 'VALORANT is a free-to-play 5v5 tactical shooter from Riot Games. Teams take turns attacking and defending. Attackers try to plant and detonate the Spike, while defenders try to stop the plant or defuse it. Each agent has unique abilities that help the team set up plays and control the map.',
    profile: {
      ranks: [
        { label: 'Peak rank', name: 'Diamond 3', badge: 'diamond-3', color: 'diamond' },
        { label: 'Current rank', name: 'Platinum 1', badge: 'platinum-1', color: 'platinum' },
      ],
      stats: [
        ['Playtime', '368h'],
        ['Matches', '657'],
        ['Account level', '400'],
        ['Wins', '330'],
        ['Losses', '321'],
        ['Win rate', '50.2%'],
        ['K/D ratio', '0.91'],
        ['Headshot rate', '19.8%'],
        ['Damage / round', '126.7'],
        ['KAST', '70.3%'],
        ['Damage delta / round', '−10'],
        ['Kills', '8,709'],
        ['Deaths', '9,593'],
        ['Assists', '3,219'],
        ['Average combat score', '188.9'],
        ['KAD ratio', '1.24'],
        ['Kills / round', '0.7'],
        ['1v1 clutches', '146'],
        ['Flawless rounds', '555'],
      ],
      agents: {
        Duelist: [
          {
            name: "Reyna",
            detail: "Blinds enemies and turns eliminations into healing or a quick escape.",
            abilities: ["Leer", "Devour", "Dismiss", "Empress"],
          },
          {
            name: "Iso",
            detail: "Uses a protective shield and can challenge an enemy to a one-on-one duel.",
            abilities: ["Contingency", "Undercut", "Double Tap", "Kill Contract"],
          },
          {
            name: "Phoenix",
            detail: "Uses flashes and fire to enter sites. His ultimate lets him push aggressively and return to where he started.",
            abilities: ["Blaze", "Hot Hands", "Curveball", "Run it Back"],
          },
        ],
        Sentinel: [
          {
            name: "Sage",
            detail: "Slows pushes, blocks paths with a wall, and heals or revives teammates.",
            abilities: ["Barrier Orb", "Slow Orb", "Healing Orb", "Resurrection"],
          },
          {
            name: "Cypher",
            detail: "Watches flanks and gathers information with traps, cages, and a remote camera.",
            abilities: ["Trapwire", "Cyber Cage", "Spycam", "Neural Theft"],
          },
          {
            name: "Killjoy",
            detail: "Uses a turret, traps, and grenades to hold space. Lockdown can force enemies out of an area.",
            abilities: ["Nanoswarm", "Alarmbot", "Turret", "Lockdown"],
          },
        ],
        Initiator: [
          {
            name: "Sova",
            detail: "Locates opponents with a recon arrow and a drone, giving teammates information before they push.",
            abilities: ["Owl Drone", "Shock Bolt", "Recon Bolt", "Hunter's Fury"],
          },
          {
            name: "Skye",
            detail: "Scouts with a controlled creature, flashes enemies, and heals nearby teammates.",
            abilities: ["Regrowth", "Trailblazer", "Guiding Light", "Seekers"],
          },
          {
            name: "Gekko",
            detail: "Sends creatures to clear space. Wingman can plant or defuse the Spike while Gekko covers him.",
            abilities: ["Mosh Pit", "Wingman", "Dizzy", "Thrash"],
          },
        ],
        Controller: [
          {
            name: "Brimstone",
            detail: "Places smokes from a tactical map and uses an incendiary grenade or orbital strike to deny space.",
            abilities: ["Stim Beacon", "Incendiary", "Sky Smoke", "Orbital Strike"],
          },
          {
            name: "Miks",
            detail: "Uses sound-based abilities to block sightlines, support teammates, and disrupt opponents.",
            abilities: ["M-pulse", "Harmonize", "Waveform", "Bassquake"],
          },
          {
            name: "Omen",
            detail: "Blocks sightlines with smokes, obscures enemy vision, and teleports to unexpected positions.",
            abilities: ["Shrouded Step", "Paranoia", "Dark Cover", "From the Shadows"],
          },
        ],
      },
      maps: ['Ascent', 'Haven', 'Bind', 'Split'],
    },
  },
  {
    title: 'R.E.P.O.',
    genre: 'Co-op horror',
    detail: 'Team up, recover fragile valuables, and make it to extraction before the monsters catch you.',
    cover: 'repo-cover.webp',
    page: 'repo.html',
  },
  {
    title: 'Wizard101',
    genre: 'Fantasy MMORPG',
    detail: 'Build a spell deck, explore the Spiral, and duel enemies in turn-based battles.',
    cover: 'wizard101-cover.webp',
    page: 'wizard101.html',
  },
];

const catalog = document.querySelector('#catalog');
const count = document.querySelector('#count');
const search = document.querySelector('#search');
const isValorantPage = Boolean(document.querySelector('#valorant-page'));

function render() {
  const query = (search?.value ?? '').trim().toLowerCase();
  const matches = isValorantPage ? games.filter(game => game.page === 'valorant.html') : games.filter(({ title, genre }) =>
    (title + ' ' + genre).toLowerCase().replaceAll('.', '').includes(query.replaceAll('.', ''))
  );
  if (count) count.textContent = matches.length + (matches.length === 1 ? ' GAME' : ' GAMES');
  catalog.replaceChildren();
  if (!matches.length) {
    const message = document.createElement('p');
    message.className = 'empty';
    message.textContent = 'No games match your search.';
    catalog.append(message);
    return;
  }
  for (const { title, genre, detail, profile, cover, page } of matches) {
    const card = document.createElement('article');
    card.className = 'game';
    const art = document.createElement('div');
    art.className = 'game-art';
    art.setAttribute('aria-hidden', 'true');
    art.textContent = title[0];
    const info = document.createElement('div');
    info.className = 'game-info';
    const category = document.createElement('p');
    category.className = 'genre';
    category.textContent = genre;
    const heading = document.createElement(isValorantPage ? 'h2' : 'h3');
    heading.textContent = title;
    const note = document.createElement('p');
    note.textContent = detail;
    info.append(category, heading, note);
    if (profile && isValorantPage) {
      card.classList.add('game--valorant');
      art.textContent = 'VALORANT';
      info.append(renderProfile(profile));
    }
    if (cover && !isValorantPage) {
      const picture = new Image();
      picture.src = cover;
      picture.alt = '';
      picture.style.cssText = 'display:block;width:100%;height:auto';
      art.replaceChildren(picture);
    }
    if (page && !isValorantPage) {
      const link = document.createElement('a');
      link.className = 'button';
      link.href = page;
      link.textContent = 'View ' + title + ' page ↗';
      info.append(link);
    }
    card.append(art, info);
    catalog.append(card);
  }
}

function renderProfile({ ranks, stats, agents, maps }) {
  const profile = document.createElement('div');
  profile.className = 'valorant-profile';

  const rankList = document.createElement('dl');
  rankList.className = 'rank-grid';
  for (const { label, name, badge, color } of ranks) {
    const tile = document.createElement('div');
    tile.className = 'rank-tile rank-tile--' + color;
    const term = document.createElement('dt');
    term.textContent = label;
    const rank = document.createElement('dd');
    const icon = new Image(68, 68);
    icon.src = 'ranks/' + badge + '.png';
    icon.alt = '';
    const title = document.createElement('strong');
    title.textContent = name;
    rank.append(icon, title);
    tile.append(term, rank);
    rankList.append(tile);
  }

  const statsHeading = document.createElement('h4');
  statsHeading.textContent = 'Competitive stats';
  const statGrid = document.createElement('dl');
  statGrid.className = 'competitive-stats';
  for (const [label, value] of stats) {
    const tile = document.createElement('div');
    const term = document.createElement('dt');
    term.textContent = label;
    const result = document.createElement('dd');
    result.textContent = value;
    tile.append(term, result);
    statGrid.append(tile);
  }

  const agentHeading = document.createElement('h4');
  agentHeading.textContent = 'Agents I play';
  const roster = document.createElement('div');
  roster.className = 'agent-roles';
  for (const [role, members] of Object.entries(agents)) {
    const group = document.createElement('section');
    group.className = 'agent-role agent-role--' + role.toLowerCase();
    const roleHeading = document.createElement('h5');
    roleHeading.textContent = role;
    const tiles = document.createElement('ul');
    tiles.className = 'agent-grid';
    for (const agent of members) {
      const tile = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-haspopup', 'dialog');
      button.addEventListener('click', () => showAgent(agent, role));
      const portrait = new Image(96, 96);
      portrait.src = 'agents/' + agent.name.toLowerCase() + '.webp';
      portrait.alt = '';
      portrait.loading = 'lazy';
      portrait.decoding = 'async';
      const name = document.createElement('span');
      name.textContent = agent.name;
      button.append(portrait, name);
      tile.append(button);
      tiles.append(tile);
    }
    group.append(roleHeading, tiles);
    roster.append(group);
  }

  const mapHeading = document.createElement('h4');
  mapHeading.textContent = 'Favorite maps';
  const mapList = document.createElement('ul');
  mapList.className = 'map-list';
  for (const map of maps) {
    const tag = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = map;
    button.setAttribute('aria-haspopup', 'dialog');
    button.addEventListener('click', () => showMap(map));
    tag.append(button);
    mapList.append(tag);
  }
  const credit = document.createElement('a');
  credit.className = 'game-credit';
  credit.href = 'https://playvalorant.com/en-us/agents/';
  credit.textContent = 'VALORANT artwork © Riot Games ↗';
  profile.append(rankList, statsHeading, statGrid, agentHeading, roster, mapHeading, mapList, credit);
  return profile;
}

const mapDialog = document.querySelector('#map-preview');
const mapTitle = mapDialog?.querySelector('h2');
const mapImage = mapDialog?.querySelector('img');

function showMap(map) {
  mapTitle.textContent = map;
  mapImage.alt = map + ' map artwork from VALORANT';
  mapImage.src = 'maps/' + map.toLowerCase() + '.webp';
  mapDialog.showModal();
}

const agentDialog = document.querySelector('#agent-preview');

function showAgent({ name, detail, abilities }, role) {
  const slug = name.toLowerCase();
  agentDialog.querySelector('h2').textContent = name;
  agentDialog.querySelector('img').src = 'agents/' + slug + '.webp';
  agentDialog.querySelector('.agent-preview-role').textContent = role;
  agentDialog.querySelector('.agent-preview-detail').textContent = detail;
  const kit = agentDialog.querySelector('ul');
  kit.replaceChildren();
  for (const ability of abilities) {
    const item = document.createElement('li');
    item.textContent = ability;
    kit.append(item);
  }
  agentDialog.querySelector('a').href = 'https://playvalorant.com/en-us/agents/' + slug + '/';
  agentDialog.showModal();
}

search?.addEventListener('input', render);
render();
