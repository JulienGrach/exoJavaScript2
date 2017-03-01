//EFFETS
//On commence par créer les fonctions qui répondent aux impératifs de l'exercice (multiplier, diviser, convertir ...):

function multipli(nombre, operateur){
  //On retourne directement le résultat.
  return nombre * operateur
}


function division(nombre, diviseur){
  //On ne veut pas de nombre à virgule.
  var divResultat = nombre / diviseur;
  var divReste = nombre % diviseur;

  //On renvoie un objet de deux éléments, egal qui est l'entier du résultat et modulo ...
  return {egal: parseInt(divResultat), modulo: divReste}
}


function convertMetre(nombre, unite){
  //On veut laisser le choix de la conversion, en fonction de l'unité départ on choisi l'unité d'arrivée.
  //On renvoie une string qui contient nombre et unité.
  if(unite ==='m'){
    var result = division(nombre, 1000).egal.toString();+"km";
    return result+"km";
  }else{
    var result = multipli(nombre, 1000).toString();
    return result+"m";
  }
}


function tordue(a, b){return (a*2+5)*50-b+1766}
//Rien de compliqué si ce n'est la formule mathématique.


function passlength(pass){
  //On récupère le pass en chaîne de caractère, on se contente de calculer sa longueur.
  //En fonction du résultat on prépare la couleur du texte en modifiant le style de "afficheur".
  if(pass.length<8){
    afficheur.style.color = 'red';
    return "Mot de passe trop court."
  }else {
    afficheur.style.color = 'green';
    return "Mot de passe correct."
  }
}


//COMMANDEUR
//On utilise un menu pour appeler les fonctions au dessus.
//Le menu prend l'objet sur lequel on a cliqué en paramètre, il vérifie ensuite à quoi correspond cet élément et appelle la fonction associée.
function menu(objet){
  //La structure est la suivante: Vérification / Demande à l'utilisateur / Affichage et appel fonction.
  if(objet === buttons.mult){
    var nombre = prompt('Quelle valeur voulez vous multiplier ?');
    var operateur = prompt('Par combien voulez vous la multiplier ?');

    //innerHTML désigne ce qui se trouve entre les balises d'un objet, en l'occurence l'objet "afficheur"
    afficheur.innerHTML = nombre+' multiplié par '+operateur+' est égal à '+multipli(Number(nombre), Number(operateur));

  }else if (objet === buttons.div){
    var nombre = prompt('Quelle valeur voulez vous diviser ?');
    var operateur = prompt('Par combien voulez vous la diviser ?');
    //Cette variable récupère l'objet de deux éléments rénvoyé par la fonction division (égal et modulo)
    var divi = division(Number(nombre), Number(operateur));

    //On appel donc tour à tour divi.egal et divi.modulo (egal et modulo, on les a nommé dans la fonction de division)
    afficheur.innerHTML = nombre+' divisé par '+operateur+' est égal à '+divi.egal+', (reste : '+divi.modulo+')';

  }else if (objet === buttons.conv){
    var nombre = prompt('Quelle valeur convertir ?');
    var operateur = prompt("Est elle en m ou en km ?");

    afficheur.innerHTML = nombre+operateur+' est égal à '+convertMetre(Number(nombre), operateur);
  }else if (objet === buttons.tord){
    var pointure = prompt('Quel est votre pointure ?');
    var annee = prompt("Quelle est votre année de naissance ?");

    afficheur.innerHTML = 'La fonction tordue renvoie: '+tordue(Number(pointure), Number(annee));
  }else if (objet === buttons.mdp){
    var pass = prompt('Créez votre mot de passe.');

    //Quel que soit la réponse, renvoyé par la fonction passlength, on met en gras (la couleur est choisie dans la fonction).
    afficheur.style.fontWeight = 'bold';
    afficheur.innerHTML = passlength(pass);
  };
}


//DOM

//Toutes les div "buttons" qu'on récupère grace à leur id sont rangé dans un objet qu'on appelle "buttons".
var buttons = {mult: document.getElementById('buttonMult'), div: document.getElementById('buttonDiv'), conv: document.getElementById('buttonConvert'), tord: document.getElementById('buttonTordu'), mdp: document.getElementById('buttonMdp')};
//On récupère à part l'objet afficheur qui permet d'afficher les résultats.
var afficheur = document.getElementById('view');

//Pour chaque élément dans l'objet buttons, on récupère le nom (mult, div, conv ...).
//En appelant ensuite buttons[nom] on parlera de l'objet rangé à cet endroit (c'est à dire de la div bouton).
for(var nom in buttons){
    //On initialise l'écoute d'événement pour chacun des objets.
    buttons[nom].addEventListener('click', function(){
      //On réinitialise la couleur de l'afficheur par défaut à chaque clique.
      afficheur.style.color = 'black';
      afficheur.style.fontWeight = 'normal';
      //Quand on clic, on appelle la fonction menu et on lui envoie l'objet qui a déclenché l'évènement.
      menu(this);
    });
}
