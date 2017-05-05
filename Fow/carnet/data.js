// Get the data
  var data = [
    {
      "partenaires": [
        {
        "nom": "Lenna Halo",
        "groupe": "seraph"
      }
        ],
      "date": "20/02/2017",
      "lieu": "Parc Jouvence",
      "url": "http://fateofwishes.forumactif.org/t2844-parc-jouvence-c-est-pas-la-gare-ca-si-termine",
      "close": 40,
      "titre" : "C'est pas la gare ça, si ?",
      "status": "closed",
      "description" : "Perdu au beau milieu d'un parc, Edward se met en quête d'une bonne âme pour lui indiquer le chemin de la gare."
    },
    {
      "partenaires": [
        {
        "nom":"Gamaliel Collins",
        "groupe": "seraph"
        }],
      "date": "10/02/2017",
      "lieu": "Cafétéria de la fac",
      "url": "http://fateofwishes.forumactif.org/t2846-cafeteria-de-la-fac-c-est-possible-de-dejeuner-en-paix",
      "close": 60,
      "titre" : "C'est possible de déjeuner en paix ?",
      "status": "progress",
      "description" : "Rencontre anodine entre notre blondin et un garçon dont la patience semble dépasser l'entendement."
    },
    {
      "partenaires": [
        {
        "nom":"Léonardo Zeit",
        "groupe": "seraph"
        }],
      "date": "01/02/2017",
      "lieu": "Chez Edward",
      "url": "http://fateofwishes.forumactif.org/t2851-maison-de-edward-intrusion",
      "close": 80,
      "titre" : "Intrusion",
      "status": "progress",
      "description" : "Un mystérieux homme débarque chez Edward et y fout le bordel en se battant... tout seul."
    },
    {
      "partenaires": [
        {
        "nom": "Alys Rousseau",
        "groupe":"nephil"
        }],
      "date": "10/03/2017",
      "lieu": "Appartement d'Alys",
      "url": "http://fateofwishes.forumactif.org/t2978-appartement-d-alys-plan-foireux-ou-heureuse-rencontre",
      "close": 80,
      "titre" : "Plan foireux ou heureuse rencontre ?",
      "status": "progress",
      "description": "Après une soirée arrosée, Edward se retrouve à devoir aller à un rendez-vous (galant ?) avec une fille dont il ignore tout..."
    },
    {
      "partenaires": [
        {
        "nom":"Victoire Owen",
        "groupe":"humain"
        }],
      "date": "09/03/2017",
      "lieu": "Bar \"Le Caporal\"",
      "url": "http://fateofwishes.forumactif.org/t2901-bar-le-caporal-vous-pensez-rester-longtemps",
      "close": 80,
      "titre" : "Vous pensez rester longtemps ?",
      "status": "progress",
      "description": "Piégé dans un bar terriblement ennuyeux pour l'anniversaire d'une camarade de classe, Edward voit son salut venir d'une ancienne connaissance qui passe également une soirée de merde. Ne reste plus qu'à trouver d'où il connaît cette jeune femme..."
    },
    {
      "partenaires": [
        {
        "nom":"Alice Nightray",
        "groupe": "nephil"
        }],
      "date": "30/03/2017",
      "lieu": "Bâtiment Nightray Production",
      "url": "http://fateofwishes.forumactif.org/t2985-batiment-nightray-production-le-debut-des-ennuis",
      "close": 80,
      "titre" : "Le début des ennui ?",
      "status": "progress",
      "description": "Il paraît qu'il vaut mieux éviter d'énerver les gens qui ont plus de pouvoir que vous. Edward va le découvrir à ses dépends lorsqu'il va faire fuir l'un des plus gros clients de la Nightray Company..."
    },
    {
      "partenaires": [
        {
        "nom":"Iris Khan Delsatre",
        "groupe": "humain"
        }],
      "date": "15/03/2017",
      "lieu": "M.A.N de Palema",
      "url": "http://fateofwishes.forumactif.org/t3004-m-a-n-de-palema-adha-et-syndrome-de-stendhal",
      "close": 80,
      "titre" : "ADHA et Syndrome de Stendhal",
      "status": "progress",
      "description" : "Journée culturelle au Musée d'Arts Naturels de Palema. Mais... Où est passé ce foutu guide ?"
    },
    {
      "partenaires": [
        {
        "nom":"Luna Nightingale",
        "groupe": "nephil"
        }],
      "date": "05/04/2017",
      "lieu": "Boîte de nuit \"Le Hungry Jackall\"",
      "url": "http://fateofwishes.forumactif.org/t3042-boite-de-nuit-hungry-jackal-non-mais-t-as-vu-c-que-t-ecoutes",
      "close": 80,
      "titre" : "Nan mais t'as vu c'que t'écoutes ?",
      "status": "progress",
      "description": "Après une rencontre désagréable avec Alice Nightray, Edward se met en quête de la prochaine étoile montante de la musique. Seulement C'est plus difficile qu'on pourrait croire quand on y connaît rien..."
    },
    {
      "partenaires": [
        {
        "nom":"Aoba Murasaki",
        "groupe": "nephil"
        }],
      "date": "07/04/2017",
      "lieu": "Hôtel/Boîte de nuit \"Night Valley\"",
      "url": "http://fateofwishes.forumactif.org/t3102-hotel-boite-de-nuit-night-valley-reveil-improbable",
      "close": 80,
      "titre" : "Réveil improbable",
      "status": "progress",
      "description": "C'est quoi cet endroit ? Et vous êtes qui, vous ? Les menottes, c'est normal ?"
    },
  ];

  var relations = [
    {
      "name": "Lenna Halo",
      "groupe": "seraph",
      "avatar": "http://i.imgur.com/lv5DVqD.jpg",
      "description": "Description à venir."
    },
    {
      "name": "Léonardo Zeit",
      "groupe": "seraph",
      "avatar": "http://i.imgur.com/JXIUwro.jpg",
      "description": "Description à venir."
    },
    {
      "name": "Alice Nightray",
      "groupe": "nephil",
      "avatar": "http://i.imgur.com/02ndvuq.png",
      "description": "Description à venir."
    },
    {
      "name": "Alys Rousseau",
      "groupe": "nephil",
      "avatar": "http://i.imgur.com/NBEvOpc.jpg",
      "description": "Description à venir."
    },{
      "name": "Gamaliel Collins",
      "groupe": "seraph",
      "avatar": "http://i.imgur.com/0MlbWl3.jpg",
      "description": "Description à venir."
    },
    {
      "name": "Aoba Murasaki",
      "groupe": "nephil",
      "avatar": "http://i.imgur.com/KG0gKV1.png",
      "description": "Description à venir."
    },
    {
      "name": "Luna Nightgale",
      "groupe": "nephil",
      "avatar": "http://i.imgur.com/uOjNbhW.jpg",
      "description": "Description à venir."
    },
    {
      "name": "Victoire Owen",
      "groupe": "humain",
      "avatar": "http://i.imgur.com/5Hgp7yc.jpg",
      "description": "Description à venir."
    },
    {
      "name": "Iris Khan Delsatre",
      "groupe": "humain",
      "avatar": "http://i.imgur.com/5Hgp7yc.jpg",
      "description": "Description à venir."
    }
  ];