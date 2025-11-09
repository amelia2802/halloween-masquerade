import {ballData} from "./data.js";

const attaireContainer = document.getElementById("attaire");
const outfitContainer = document.getElementById("outfit");
const partnerContainer = document.getElementById("partner");
const identityContainer = document.getElementById("truth");
const truth = document.getElementById("reveal");


const heroSection = document.querySelector("main");
const attaireSection = document.querySelector(".user-attaire");
const outfitSection = document.querySelector(".user-outfit");
const partnerSection = document.querySelector(".user-partner");
const identitySection = document.querySelector(".user-identity");
const storySection = document.querySelector(".user-story");

const enterBallBtn = document.querySelector('.enter-ball');

let userChoices = {
    attire: null,
    outfit: null,
    partner: null,
    identity: null
};


function renderAttireSelection(){
    const selectAttire = 
        `
            <div class="attaire-card" id="men">
                <p>♂️</p>
                <h3>Men's Attire</h3>
                <button class="select-attaire">Select</button>
            </div>
            <div class="attaire-card" id="women">
                <p>♀️</p>
                <h3>Women's Attire</h3>
                <button class="select-attaire">Select</button>
            </div>
        `;

    attaireContainer.innerHTML = selectAttire;

    attaireContainer.querySelector("#men .select-attaire").addEventListener("click",()=>{
        renderOutfitSelection("men");
        showSection(outfitSection);
    });

    attaireContainer.querySelector("#women .select-attaire").addEventListener("click",()=>{
        renderOutfitSelection("women");
        showSection(outfitSection);
    });
}

function renderOutfitSelection(selectedAttire){
    userChoices.attire = selectedAttire;
    const dresses = ballData.dresses[selectedAttire];

    const selectOutfit = dresses.map((dress) => {
        return(
            `
                <div class="dress-card">
                    <div class="dress-img">
                        <img src="./assets/img/${dress.image}" alt="${dress.name}">
                    </div>
                    <div>
                        <h3>${dress.name}</h3>
                        <p>${dress.description}</p>
                    </div>
                    <button class="select-outfit">Wear This</button>
                </div>
            `
        )
    }).join("");

    outfitContainer.innerHTML = selectOutfit;

    document.querySelectorAll('.select-outfit').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            userChoices.outfit = dresses[index].id; 
            showSection(partnerSection);
        });
    });
}

function renderPartnerSelection(){
    const selectPartner = ballData.partners.map((partner) => {
        return(
            `
                <div class="partner-card">
                    <div class="partner-img">
                        <img src="./assets/img/${partner.image}" alt="${partner.name}">
                    </div>
                    <div>
                        <h3>${partner.name}</h3>
                        <p>${partner.description}</p>
                    </div>
                    <button class="select-partner">Select</button>
                </div>
            `
        )
    }).join("");

    partnerContainer.innerHTML = selectPartner;

    document.querySelectorAll('.select-partner').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            userChoices.partner = ballData.partners[index].id; 
            showSection(identitySection); 
        });
    });
}

truth.addEventListener("click", () => {
    const identity = ballData.identities[Math.floor(Math.random() * ballData.identities.length)];
    userChoices.identity = identity.id;

    identityContainer.innerHTML = `
        <div>
            <img src="./assets/img/${identity.image}" alt="${identity.name}">
            <div>
                <h3> You are a/an ${identity.name}</h3>
            </div>
            <button id="viewStory" class="enter-ball">View Your Story</button>
        </div>
    `

    document.getElementById('viewStory').addEventListener('click', () => {
        generateStory();
        showSection(storySection);
    });

})


function hideAllSections() {
    heroSection.classList.add('hidden');
    attaireSection.classList.add('hidden');
    outfitSection.classList.add('hidden');
    partnerSection.classList.add('hidden');
    identitySection.classList.add('hidden');
    storySection.classList.add('hidden');
}

function showSection(section) {
    hideAllSections(); // First, hide everything
    section.classList.remove('hidden'); // Then show the one we want
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
}

enterBallBtn.addEventListener('click', () => {
    showSection(attaireSection);
})

function generateStory() {

    const selectedDress = ballData.dresses[userChoices.attire].find(
        d => d.id === userChoices.outfit
    );
    const selectedPartner = ballData.partners.find(
        p => p.id === userChoices.partner
    );
    const selectedIdentity = ballData.identities.find(
        i => i.id === userChoices.identity
    );

    let identityStory = "";
    
    if (selectedIdentity.name === "Vampire") {
        identityStory = "The taste of immortality is intoxicating. Tonight, you embrace the darkness.";
    } else if (selectedIdentity.name === "Human") {
        identityStory = "Your mortality makes every moment precious. You face the supernatural with courage.";
    } else if (selectedIdentity.name === "Witch") {
        identityStory = "Ancient power courses through your veins. Magic responds to your call.";
    } else if (selectedIdentity.name === "Werewolf") {
        identityStory = "The moon calls to your wild nature. You are a guardian of the pack.";
    } else if (selectedIdentity.name === "Angel") {
        identityStory = "Divine grace surrounds you. You walk between worlds.";
    }

    const storyHTML = `
        <div class="story-summary">
            <h2>Your Mystic Falls Story</h2>
            <div class="story-images">
                <div class="story-item">
                    <img src="./assets/img/${selectedDress.image}" alt="${selectedDress.name}">
                </div>
                
                <div class="story-item">
                    <img src="./assets/img/${selectedPartner.image}" alt="${selectedPartner.name}">
                </div>
                
                <div class="story-item">
                    <img src="./assets/img/${selectedIdentity.image}" alt="${selectedIdentity.name}">
                </div>
            </div>
            <p class="story-text">
                The moonlight dances across your <strong>${selectedDress.description}</strong> 
                as you step into the Lockwood Mansion.
            </p>
            <p class="story-text">
                <strong>${selectedPartner.name}</strong> catches your eye. 
                ${selectedPartner.description}
            </p>
            
            <p class="story-text">
                As a <strong>${selectedIdentity.name}</strong>, ${identityStory}
            </p>
            
            <p class="final-message">Your fate awaits at the Founder's Ball...</p>
            
            <button class="enter-ball" onclick="location.reload()">Start Over</button>
        </div>
    `;

    storySection.innerHTML = storyHTML;
}

renderAttireSelection();
renderPartnerSelection();