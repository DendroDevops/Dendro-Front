import axios from 'axios';

describe('GET POST PUT function', () => {

  const instance = axios.create({
    baseURL: 'https://prex.dendromap.2m-advisory.fr/api/public/',
    timeout: 1000,
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImlkIjozMiwiaXNBZG1pbiI6dHJ1ZSwiZ3JvdXBlIjoiREVORFJPTUFQIiwiZm9yZmFpdCI6bnVsbH0sImV4cCI6MTU1OTc0OTI4NSwiaWF0IjoxNTUxODY1Mjg1fQ.Vfn5y6dfttNnfy5kmnfqAGU6dEHI33uFYHKmtwExAzo',
      'Accept': '*'
    }
  });

  it("should return Inventaire", (done) => {
    //const dummyUsers =
    const payload = {
      "essence": [{
        "diametre": "90",
        "hauteur": "6",
        "numSujet": "Cimetière",
        "codeSite": "Xyz",
        "countSubject": "5",
        "caract": "",
        "caractOther": "",
        "stadeDev": "",
        "houppier": "",
        "critere": "",
        "critereCom": "",
        "etatGeneral": [],
        "etatSanGeneralChampignons": [],
        "etatSanGeneralParasite": [],
        "etatSanGeneralOther": "",
        "risque": "",
        "domaine": "",
        "nuisance": [],
        "proximite": [],
        "proximiteOther": "",
        "tauxFreq": "",
        "typePassage": [],
        "typePassageOther": "",
        "accessibilite": "",
        "accessibiliteOther": "",
        "nbreSujetConcerne": null,
        "travaux": [],
        "travauxSoin": "",
        "travauxProtection": "",
        "travauxOther": "",
        "dateTravaux": "",
        "travauxCom": "",
        "travauxTypeIntervention": "",
        "varietyGrade": null,
        "healthIndex": 0,
        "aestheticIndex": 0,
        "locationIndex": 0,
        "espece": 6,
        "proximiteWithDict": []
      }],
      "coord": [{
        "lat": 48.86362365057813,
        "long": 2.396092414855957
      }, {
        "lat": 48.86163656278251,
        "long": 2.3890452459454536
      }, {
        "lat": 48.85712038133589,
        "long": 2.396000884473324
      }, {
        "lat": 48.85964961667223,
        "long": 2.4015839025378227
      }, {
        "lat": 48.86362365057813,
        "long": 2.396092414855957
      }],
      "type": "EPP",
      "isFinished": false
    };

    const payloadPut = {
      "essence": [{
        "diametre": "90",
        "hauteur": "6",
        "numSujet": "Cimetière",
        "codeSite": "Xyz",
        "countSubject": "5",
        "caract": "other",
        "caractOther": "Père Lachaise",
        "stadeDev": "adulte",
        "houppier": "etale",
        "critere": ["comment"],
        "critereCom": "Cimetière historique",
        "etatGeneral": ["sain", "exam-comple", "champignons-lignivores", "parasite", "other"],
        "etatSanGeneralChampignons": [45, 56],
        "etatSanGeneralParasite": [9],
        "etatSanGeneralOther": "Bon",
        "risque": "faible",
        "domaine": "espace-bublic",
        "nuisance": ["branches-retombantes-sur-les-voies", "branches-dans-les-amnagements", "systme-racinaire-dans-les-rseaux"],
        "proximite": ["btiment-immeuble", "chemin-voie-prive", "ecole-btiment-public", "eclairage-public", "rseau-lectrique-gain", "other"],
        "proximiteOther": "Tombes",
        "tauxFreq": "passage-constant",
        "typePassage": ["pietons", "velo-rollers", "other"],
        "typePassageOther": "Touristes chinois",
        "accessibilite": "other",
        "accessibiliteOther": "Sonnez à l'accueil",
        "nbreSujetConcerne": "2",
        "travaux": ["taille-de-cohabitation", "soin-particulier-precisez", "protection-particuliere-precisez", "other"],
        "travauxSoin": "Hug",
        "travauxProtection": "Peinture",
        "travauxOther": "Be quiet",
        "dateTravaux": "immediat",
        "userEditedDateTravaux": "2019-03-27T11:10:34.073Z",
        "travauxCom": "Silence !",
        "travauxTypeIntervention": "",
        "varietyGrade": "4",
        "healthIndex": 4,
        "healthColumn": 2,
        "aestheticIndex": 6,
        "aestheticColumn": 2,
        "locationIndex": "10",
        "espece": 6,
        "proximiteWithDict": ["eclairage-public"],
        "id": 84
      }],
      "coord": [{
        "lat": 48.86362365057813,
        "long": 2.396092414855957
      }, {
        "lat": 48.86163656278251,
        "long": 2.3890452459454536
      }, {
        "lat": 48.85712038133589,
        "long": 2.396000884473324
      }, {
        "lat": 48.85964961667223,
        "long": 2.4015839025378227
      }, {
        "lat": 48.86362365057813,
        "long": 2.396092414855957
      }],
      "type": "EPP",
      "isFinished": false,
      "id": 239
    };

    const expectedPutResult = {
      id: 239,
      type: "EPP",
      epaysage: {
        id: 42,
        ville: "62 Rue des Rondeaux",
        address: " 75020 Paris",
        coord: [
          {
            lat: 48.863623650578,
            long: 2.396092414856
          },
          {
            lat: 48.861636562783,
            long: 2.3890452459455
          },
          {
            lat: 48.857120381336,
            long: 2.3960008844733
          },
          {
            lat: 48.859649616672,
            long: 2.4015839025378
          },
          {
            lat: 48.863623650578,
            long: 2.396092414856
          }
        ],
        essence: [
          {
            id: 84,
            espece: {
              id: 6,
              name: "pinsapo",
              cultivar: "",
              genre: "Abies",
              categorie: "R",
              tarif: 150,
              indiceEspece: 15
            },
            diametre: 90,
            hauteur: 6,
            numSujet: "Cimetière",
            codeSite: "Xyz",
            countSubject: 5,
            caract: "other",
            caractOther: "Père Lachaise",
            stadeDev: "adulte",
            houppier: "etale",
            critere: ["comment"],
            critereCom: "Cimetière historique",
            etatGeneral: [
              "sain",
              "exam-comple",
              "champignons-lignivores",
              "parasite",
              "other"
            ],
            etatSanGeneralChampignons: [
              {
                id: 45,
                name: "Fomitopsis pinicola - Polypore marginé",
                attaqueF: "Sur : collet, tronc. Type : rouge, cubique, sèche",
                attaqueR: "Sur : collet, tronc. Type : rouge, cubique, sèche",
                imgUrl: {
                  img1: "1da1cd834ac6e86472925c95589dae95.jpg"
                }
              },
              {
                id: 56,
                name: "Armillaria mellea -Armillaire couleur miel",
                attaqueF:
                  "Sur : racines, collet, tronc. Type : blanc-jaunâtre, fibreuse, visqueuse",
                attaqueR: "",
                imgUrl: {
                  img1: "8a71341cc8c7abf2c66ab7f4a69d99f6.jpg"
                }
              }
            ],
            etatSanGeneralParasite: [
              {
                id: 9,
                name: "Gui"
              }
            ],
            etatSanGeneralOther: "Bon",
            risque: "faible",
            domaine: "espace-bublic",
            nuisance: [
              "branches-retombantes-sur-les-voies",
              "branches-dans-les-amnagements",
              "systme-racinaire-dans-les-rseaux"
            ],
            proximite: [
              "btiment-immeuble",
              "chemin-voie-prive",
              "ecole-btiment-public",
              "eclairage-public",
              "rseau-lectrique-gain",
              "other"
            ],
            proximiteOther: "Tombes",
            tauxFreq: "passage-constant",
            typePassage: ["pietons", "velo-rollers", "other"],
            typePassageOther: "Touristes chinois",
            accessibilite: "other",
            accessibiliteOther: "Sonnez à l'accueil",
            nbreSujetConcerne: 2,
            travaux: [
              "taille-de-cohabitation",
              "soin-particulier-precisez",
              "protection-particuliere-precisez",
              "other"
            ],
            travauxSoin: "Hug",
            travauxProtection: "Peinture",
            travauxOther: "Be quiet",
            dateTravaux: "immediat",
            userEditedDateTravaux: "2019-03-27T11:10:34.073Z",
            dateProVisite: null,
            travauxCom: "Silence !",
            travauxTypeIntervention: null,
            varietyGrade: 4,
            healthIndex: 4,
            aestheticIndex: 6,
            locationIndex: 10,
            aestheticColumn: 2,
            healthColumn: 2,
            beva: 50000,
            proximitewithDict: ["eclairage-public"],
            imageUrl: {
              img1: null,
              img2: null,
              img3: null
            }
          }
        ]
      },
      user: {
        id: 32,
        email: "2m-advisory@dendromap.com",
        username: "2M",
        img: "490fd20f8b59f8a663b26453b769d304.png",
        profil: "2M-ADVISORY"
      },
      isFinished: false,
      createdAt: "2019-03-27T11:46:18+0100",
      updatedAt: "2019-03-27T12:14:55+0100"
    };


    const epaysageId = 261;
    instance.put(`/inventaire/${epaysageId}/epaysage`, payloadPut)
      .then((responsePut) => {
        expect(responsePut.status).toBe(201);
        instance.get(`inventaire/${epaysageId}`)
          .then(res => {
            expect(res.status).toBe(200);
            const registeredTree = res.data;
            Object.keys(expectedPutResult).forEach((key) => {
              if (key !== 'createdAt' && key !== 'id' && key !== 'updatedAt' && key !== 'user') {
                if (key === 'epaysage') {
                  Object.keys(expectedPutResult.epaysage).forEach((key) => {
                    if (key !== 'id') {
                      if (key === 'essence') {
                        Object.keys(expectedPutResult.epaysage.essence[0]).forEach((key) => {
                          if (key !== 'userEditedDateTravaux') {
                            console.log(key, expectedPutResult.epaysage.essence[0][key], registeredTree.epaysage.essence[0][key])
                            expect(expectedPutResult.epaysage.essence[0][key]).toEqual(registeredTree.epaysage.essence[0][key]);
                            done();
                          }
                        });
                      }
                    }
                  });
                }
              }
            });
          })
          .catch(err => {
            console.log(err);
            done();
          })
      })
      .catch(err => {
        console.log(err);
        done();
      })
    //expect(response.data.length).toBe(1);
  });
});
