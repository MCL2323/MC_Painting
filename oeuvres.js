// Liste des œuvres affichées dans la galerie, dans l'ordre.
// Pour chaque œuvre, remplissez les champs entre guillemets :
//   titre      : le nom de la peinture        ex. "Le refuge"
//   technique  : le type de peinture          ex. "Peinture à l'huile"
//   dimensions : hauteur × largeur            ex. "100 × 50 cm"
//   annee      : l'année                      ex. "2008"
// Version anglaise : titre_en, technique_en, dimensions_en.
// Si un champ _en est absent, la version française est reprise.
// Un champ laissé vide ("") n'est pas affiché.

const ARTISTE = "Matthieu Clauet";

const HUILE = { technique: "Peinture à l'huile", technique_en: "Oil painting" };
const AQUARELLE = { technique: "Aquarelle", technique_en: "Watercolour" };

const OEUVRES = [
  { fichier: "01.jpg", titre: "88", ...HUILE, dimensions: "80 × 40 cm", annee: "2008" },
  { fichier: "02.jpg", titre: "American Dream", ...HUILE, dimensions: "73 × 54 cm", annee: "2008" },
  { fichier: "03.jpg", titre: "Aspiration", ...HUILE, dimensions: "30 × 30 cm", annee: "2003" },
  { fichier: "04.jpg", titre: "Bouddha", titre_en: "Buddha", ...HUILE, dimensions: "65 × 54 cm", annee: "2003" },
  { fichier: "05.jpg", titre: "Celebration", ...HUILE, dimensions: "100 × 150 cm, en 6 panneaux", dimensions_en: "100 × 150 cm, in 6 panels", annee: "2009" },
  { fichier: "06.jpg", titre: "De nuit", titre_en: "By night", technique: "Digital", technique_en: "Digital", dimensions: "45 × 60 cm", annee: "2003" },
  { fichier: "07.jpg", titre: "En automne", titre_en: "In autumn", ...AQUARELLE, dimensions: "23 × 23 cm", annee: "2004" },
  { fichier: "08.jpg", titre: "En été", titre_en: "In summer", ...AQUARELLE, dimensions: "23 × 23 cm", annee: "2004" },
  { fichier: "09.jpg", titre: "Filet de Fish", ...HUILE, dimensions: "60 × 20 cm", annee: "2007" },
  { fichier: "10.jpg", titre: "Flor", ...HUILE, dimensions: "30 × 30 cm", annee: "2006" },
  { fichier: "11.jpg", titre: "Freedom", ...AQUARELLE, dimensions: "70 × 50 cm", annee: "2006" },
  { fichier: "21.jpg", titre: "Kitchen", ...HUILE, dimensions: "160 × 100 cm", annee: "2021" },
  { fichier: "12.jpg", titre: "Le cycle", titre_en: "The cycle", ...HUILE, dimensions: "150 × 50 cm", annee: "2008" },
  { fichier: "13.jpg", titre: "Mr T", technique: "Peinture à l'huile sur feuilles d'or d'applique", technique_en: "Oil on gold leaf", dimensions: "60 × 60 cm", annee: "2007" },
  { fichier: "15.jpg", titre: "Ninja", technique: "Aquarelle, peinture à l'huile et encre de Chine", technique_en: "Watercolour, oil and Indian ink", dimensions: "48 × 63 cm", annee: "2005" },
  { fichier: "16.jpg", titre: "Paris", ...HUILE, dimensions: "100 × 100 cm", annee: "2003" },
  { fichier: "17.jpg", titre: "Rebel", ...HUILE, dimensions: "27 × 35 cm", annee: "2002" },
  { fichier: "18.jpg", titre: "Soliflore", ...HUILE, dimensions: "60 × 30 cm", annee: "2005" },
  { fichier: "19.jpg", titre: "Target", ...HUILE, dimensions: "50 × 50 cm", annee: "2007" },
  { fichier: "20.jpg", titre: "Virtual Fish", ...HUILE, dimensions: "60 × 73 cm", annee: "2006" },
];
