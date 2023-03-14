let statutJeu = document.querySelector("#statut-jeu");
let boutons = document.querySelectorAll(".container-boutons button");
let boutonsTexte = ["PIERRE", "FEUILLE", "CISEAUX"];
let scoreJoueur = 0;
let scoreOrdi = 0;
let scores = document.querySelectorAll("#scores");

function calculerResultat(monCoup, coupOrdi) {
  if (coupOrdi == monCoup) {
    return "Copieur !";
  } else if (coupOrdi == monCoup - 1 || (monCoup == 1 && coupOrdi == 3)) {
    scoreJoueur++;
    scores[0].textContent = scoreJoueur;
    return "OK, gagné...";
  } else {
    scoreOrdi++;
    scores[1].textContent = scoreOrdi;
    return "Looser !";
  }
}

function coupAleatoire() {
  return Math.floor(Math.random() * 3);
}

function commencerPartie() {
  statutJeu.textContent = "Choisissez !";
  boutons.forEach((bouton, index) => {
    bouton.textContent = boutonsTexte[index];
    bouton.addEventListener("click", finirPartie);
  });
}

function finirPartie(event) {
  let monCoup = boutonsTexte.indexOf(event.target.textContent);

  let coupOrdi = coupAleatoire();

  statutJeu.textContent = calculerResultat(monCoup, coupOrdi);

  let affichageCoupsJoues = document.querySelectorAll(
    ".container-coups-joues h2"
  );
  let texteCoupsJoues = [boutonsTexte[monCoup], "vs.", boutonsTexte[coupOrdi]];

  affichageCoupsJoues.forEach(
    (elt, index) => (elt.textContent = texteCoupsJoues[index])
  );

  boutons.forEach((elt, index) => {
    if (index === 0 || index === 2) {
      elt.style.display = "none";
    } else {
      elt.textContent = "Rejouer ";
    }
  });
  boutons[1].removeEventListener("click", finirPartie);

  boutons[1].addEventListener("click", (e) => {
    commencerPartie();
    boutons[0].style.display = "inline-block";
    boutons[2].style.display = "inline-block";
  });
}

commencerPartie();
