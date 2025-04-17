const tasks = [
    { question: "Der neu___ Nachbar ist ganz nett.", answer: "e" },
    { question: "Wo ist das blau___ Hemd von Linus?", answer: "e" },
    { question: "Die alt___ Wohnung hat mir besser gefallen.", answer: "e" },
    { question: "Die spanisch___ Tomaten kosten nur 1,90 Euro.", answer: "en" },
    { question: "Die blau___ Hose passt mir leider nicht mehr.", answer: "e" },
    { question: "Ich hab den ganz___ Tag mein Handy gesucht.", answer: "en" },
    { question: "Ich nehme das weiß___ Kleid.", answer: "e" },
    { question: "Willst du die golden___ Schuhe anziehen?", answer: "en" },
    { question: "In dem klein___ Flugzeug habe ich Angst.", answer: "en" },
    { question: "Ich habe mich so über die unfreundlich___ Leute geärgert.", answer: "en" },
    { question: "Ich wohne im dritt___ Stock rechts.", answer: "en" },
    { question: "Der Mann mit den blau___ Augen gefällt mir.", answer: "en" },
    { question: "Wie findest du die deutsch___ Autos?", answer: "en" },
    { question: "Die alt___ Sachen kannst du mitnehmen.", answer: "en" },
    { question: "Das alt___ Buch habe ich von meinem Vater bekommen.", answer: "e" },
    { question: "Willst du wirklich den teur___ Laptop kaufen?", answer: "en" },
    { question: "Wir haben lange mit der nett___ Dame gesprochen.", answer: "en" },
    { question: "Die neu___ Kamera ist viel besser als die alte.", answer: "e" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);