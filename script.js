const teamCombos = [
  ["C1","C3","C1","C2","C3","C2","C1","C2","C1","C2"],
  ["C3","C1","C2","C1","C2","C3","D1","D1","D2","D2"],
  ["C2","D1","C3","D1","C1","D2","C3","C1","C2","C1"],
  ["D1","D3","D2","D2","D3","D3","C4","C4","C3","C3"],
  ["D2","D4","D3","D4","D4","D4","D4","D3","D5","D1"],
  ["D3","D5","D4","D5","D5","D5","D5","D4","D3","D5"],
  ["C4","C4","A4","B3","A7","A7","D2","D5","A1","B5"],
  ["A1","A2","A3","A1","A1","A2","A2","A3","A2","A1"],
  ["A4","A4","A5","A2","A2","A4","A3","A4","A5","A4"],
  ["A6","A6","A6","A3","A6","A5","A4","A5","A6","A6"],
  ["B5","B1","B2","B5","B1","B2","B2","B1","B2","B1"]
];

// Function to retrieve player based on code and team selection
function getPlayer(code, homeBat, homeBowl, awayBat, awayBowl, isHomeBatFirst) {
  const team = code[0];
  const idx = parseInt(code.slice(1)) - 1;

  switch (team) {
    case "A": return isHomeBatFirst ? homeBat[idx] : awayBat[idx];
    case "B": return isHomeBatFirst ? homeBowl[idx] : awayBowl[idx];
    case "C": return isHomeBatFirst ? awayBat[idx] : homeBat[idx];
    case "D": return isHomeBatFirst ? awayBowl[idx] : homeBowl[idx];
    default: return "Unknown";
  }
}

// Function to generate all possible teams
function buildTeams(homeBat, homeBowl, awayBat, awayBowl) {
  const allTeams = [];

  for (let isHomeBatFirst of [true, false]) {
    for (let i = 0; i < 10; i++) {
      const team = [];
      for (let j = 0; j < 11; j++) {
        const code = teamCombos[j][i];
        team.push(getPlayer(code, homeBat, homeBowl, awayBat, awayBowl, isHomeBatFirst));
      }
      const cap = team[0];
      const vc = team[1];
      allTeams.push({ team, cap, vc });
    }
  }

  return allTeams;
}

// Event listener for the Generate Teams button
document.getElementById("generateBtn").addEventListener("click", () => {
  // Retrieving values from text areas and handling empty input
  const homeBat = document.getElementById("homeBatters").value.trim().split(",").map(s => s.trim()).filter(Boolean);
  const homeBowl = document.getElementById("homeBowlers").value.trim().split(",").map(s => s.trim()).filter(Boolean);
  const awayBat = document.getElementById("awayBatters").value.trim().split(",").map(s => s.trim()).filter(Boolean);
  const awayBowl = document.getElementById("awayBowlers").value.trim().split(",").map(s => s.trim()).filter(Boolean);

  // Ensure all necessary input is filled
  if (homeBat.length === 0 || homeBowl.length === 0 || awayBat.length === 0 || awayBowl.length === 0) {
    alert("Please fill all fields before generating teams.");
    return;
  }

  // Generating teams
  const teams = buildTeams(homeBat, homeBowl, awayBat, awayBowl);

  // Display output
  const output = document.getElementById("output");
  output.innerHTML = ""; // Clear previous output

  teams.forEach((t, idx) => {
    const div = document.createElement("div");
    div.className = "team-block";
    div.innerHTML = `
      <h3>Team ${idx + 1}</h3>
      <p><strong>Captain:</strong> ${t.cap} | <strong>Vice-Captain:</strong> ${t.vc}</p>
      <ol>${t.team.map(player => `<li>${player}</li>`).join("")}</ol>
    `;
    output.appendChild(div);
  });
});

// Event listener for Clear All button
document.getElementById("clearAllBtn").addEventListener("click", () => {
  // Clear all fields
  document.getElementById("homeBatters").value = "";
  document.getElementById("homeBowlers").value = "";
  document.getElementById("awayBatters").value = "";
  document.getElementById("awayBowlers").value = "";
  document.getElementById("output").innerHTML = "";
});
