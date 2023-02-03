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
      "diametre": "90",
      "hauteur": "6",
      "caractPied": [],
      "caractPiedOther": null,
      "caractTronc": null,
      "caractTroncMultiples": null,
      "portArbre": null,
      "stadeDev": null,
      "critere": [],
      "critereOther": null,
      "etatSanCollet": [],
      "etatSanColletCavite": null,
      "etatSanColletChampignons": [],
      "etatSanTronc": [],
      "etatSanTroncCavite": null,
      "etatSanTroncCorpsEtranger": null,
      "etatSanTroncChampignons": [],
      "etatSanTroncNuisibles": [],
      "etatSanHouppier": [],
      "etatSanHouppierChampignons": [],
      "etatSanHouppierNuisibles": [],
      "etatSanGeneral": [],
      "risque": [{
        "collet": null
      }, {
        "tronc": null
      }, {
        "houppier": null
      }],
      "risqueGeneral": null,
      "risqueGeneralOther": null,
      "implantation": null,
      "domaine": null,
      "nuisance": [],
      "proximite": [],
      "proximiteOther": null,
      "tauxFreq": null,
      "typePassage": [],
      "typePassageOther": "",
      "accessibilite": null,
      "accessibiliteOther": null,
      "abattage": "",
      "travauxCollet": "",
      "travauxTronc": "",
      "travauxHouppier": "",
      "dateTravaux": "",
      "typeIntervention": "",
      "varietyGrade": null,
      "healthIndex": 0,
      "aestheticIndex": 2,
      "locationIndex": 0,
      "coord": {
        "lat": 48.85802126788105,
        "long": 2.2503458708524704
      },
      "espece": 46,
      "numSujet": "Piscine",
      "codeSite": "345678",
      "isFinished": false
    };

    const payloadPut = {
      "diametre": 90,
      "hauteur": 6,
      "caractPied": ["terre-litiere", "other"],
      "caractPiedOther": "Des roses",
      "caractTronc": "tronc-multiples",
      "caractTroncMultiples": "2",
      "portArbre": "port-libre",
      "stadeDev": "adulte",
      "critere": ["autre-precisez"],
      "critereOther": "Arbre de Sylvain",
      "etatSanCollet": ["rejets-rsurgences-racinaires", "cavit-nombre", "champignons-lignivores"],
      "etatSanColletCavite": "3",
      "etatSanColletChampignons": [45],
      "etatSanTronc": ["cavit-nombre", "corps-etranger", "parasite", "champignons-lignivores"],
      "etatSanTroncCavite": "3",
      "etatSanTroncCorpsEtranger": "Un cadenas",
      "etatSanTroncChampignons": [45, 46],
      "etatSanTroncNuisibles": [9],
      "etatSanHouppier": ["descente-de-cime", "champignons-lignivores", "parasite"],
      "etatSanHouppierChampignons": [45],
      "etatSanHouppierNuisibles": [9],
      "etatSanGeneral": ["mort", "exam-comple"],
      "risque": [{
        "collet": "modere"
      }, {
        "tronc": "faible"
      }, {
        "houppier": "modere"
      }],
      "risqueGeneral": "other",
      "risqueGeneralOther": "Me semble ok",
      "implantation": "isole",
      "domaine": "espace-bublic",
      "nuisance": ["systme-racinaire-dans-les-rseaux"],
      "proximite": ["rseau-lectrique-gain", "rseau-lectrique-non-gain", "other"],
      "proximiteOther": "Un Josel",
      "proximiteWithDict": ["rseau-lectrique-gain", "rseau-lectrique-non-gain"],
      "tauxFreq": "passage-constant",
      "typePassage": ["velo-rollers", "other"],
      "typePassageOther": "Passage de Marion",
      "accessibilite": "other",
      "accessibiliteOther": "Attention aux Mirsad",
      "abattage": "",
      "travauxCollet": "other",
      "travauxColletOther": "à définir",
      "travauxTronc": "other",
      "travauxTroncOther": "coco",
      "travauxTroncProtection": "Mettre une bache",
      "travauxHouppier": "other",
      "travauxHouppierOther": "À définir",

      "dateTravaux": "immediat",
      "varietyGrade": "5.5",
      "healthIndex": 4,
      "healthColumn": 2,
      "aestheticIndex": 2,
      "aestheticColumn": 2,
      "locationIndex": "10",
      "coord": {
        "lat": 48.83541126185,
        "long": 2.3698553815484
      },
      "espece": 63,
      "numSujet": "Piscine",
      "codeSite": "345678",
      "isFinished": false,
      "userEditedDateTravaux": "2019-04-25T13:11:17+0200",
      "inventoryId": 65
    };

    const expectedPutResult = {
      createdAt: '2019-03-22T15:37:46+0100',
      epaysage: null,
      isFinished: false,
      type: 'ARBRE',
      updatedAt: '2019-03-25T15:12:26+0100',
      user: {
        id: 32,
        email: '2m-advisory@dendromap.com',
        username: '2M',
        img: '490fd20f8b59f8a663b26453b769d304.png',
        profil: '2M-ADVISORY',
      },
      arbre: {
        abattage: null,
        accessibilite: 'other',
        accessibiliteOther: 'Attention aux Mirsad',
        address: null,
        aestheticColumn: 2,
        aestheticIndex: 2,
        beva: 8250,
        caractPied: ['terre-litiere', 'other'],
        caractPiedOther: 'Des roses',
        caractTronc: 'tronc-multiples',
        caractTroncMultiples: 2,
        codeSite: '345678',
        coord: {
          lat: 48.83541126185,
          long: 2.3698553815484
        },
        critere: ['autre-precisez'],
        critereOther: 'Arbre de Sylvain',
        dateTravaux: 'immediat',
        diametre: 90,
        domaine: 'espace-bublic',
        espece: {
          "id": 63,
          "name": "schmidtii",
          "cultivar": " ",
          "genre": "Betula",
          "categorie": "F",
          "tarif": 99,
          "indiceEspece": 9.9
        },
        etatSanCollet: ['rejets-rsurgences-racinaires', 'cavit-nombre', 'champignons-lignivores'],
        etatSanColletCavite: 3,
        etatSanColletChampignons: [
          {
            id: 45,
            name: 'Fomitopsis pinicola - Polypore marginé',
            attaqueF: 'Sur : collet, tronc. Type : rouge, cubique, sèche',
            attaqueR: 'Sur : collet, tronc. Type : rouge, cubique, sèche',
            imgUrl: {
              img1: '1da1cd834ac6e86472925c95589dae95.jpg',
            }
          },
        ],
        etatSanGeneral: ['mort', 'exam-comple'],
        etatSanHouppier: ['descente-de-cime', 'champignons-lignivores', 'parasite'],
        etatSanHouppierChampignons: [
          {
            id: 45,
            name: 'Fomitopsis pinicola - Polypore marginé',
            attaqueF: 'Sur : collet, tronc. Type : rouge, cubique, sèche',
            attaqueR: 'Sur : collet, tronc. Type : rouge, cubique, sèche',
            imgUrl: {
              img1: '1da1cd834ac6e86472925c95589dae95.jpg',
            }
          },
        ],
        etatSanHouppierNuisibles: [
          {
            id: 9,
            name: 'Gui'
          },
        ],
        etatSanTronc: ['cavit-nombre', 'corps-etranger', 'parasite', 'champignons-lignivores'],
        etatSanTroncCavite: 3,
        etatSanTroncChampignons: [
          {
            id: 45,
            name: 'Fomitopsis pinicola - Polypore marginé',
            attaqueF: 'Sur : collet, tronc. Type : rouge, cubique, sèche',
            attaqueR: 'Sur : collet, tronc. Type : rouge, cubique, sèche',
            imgUrl: {
              img1: '1da1cd834ac6e86472925c95589dae95.jpg',
            }
          },
          {
            id: 46,
            name: 'Funalia trogii - Funalie de Trog',
            attaqueF: 'Sur : tronc, houppier. Type : blanche',
            attaqueR: 'Sur : tronc, houppier. Type : blanche',
            imgUrl: {
              img1: 'e244b6a5a933828b1736a79a58b0a608.png',
            }
          },
        ],
        etatSanTroncCorpsEtranger: 'Un cadenas',
        etatSanTroncNuisibles: [
          {
            id: 9,
            name: 'Gui'
          },
        ],
        hauteur: 6,
        healthColumn: 2,
        healthIndex: 4,
        imgUrl: {
          img1: null,
          img2: null,
          img3: null
        },
        implantation: 'isole',
        locationIndex: 10,
        nuisance: ['systme-racinaire-dans-les-rseaux'],
        nuisanceNuisibles: [],
        numSujet: 'Piscine',
        portArbre: 'port-libre',
        proximite: ['rseau-lectrique-gain', 'rseau-lectrique-non-gain', 'other'],
        proximiteOther: 'Un Josel',
        proximiteWithDict: ["rseau-lectrique-gain", "rseau-lectrique-non-gain"],
        risque: [{collet: 'modere'}, {tronc: 'faible'}, {houppier: 'modere'}],
        risqueGeneral: 'other',
        risqueGeneralOther: 'Me semble ok',
        stadeDev: 'adulte',
        tauxFreq: 'passage-constant',
        travauxCollet: "other",
        travauxColletOther: "à définir",
        travauxTronc: "other",
        travauxTroncProtection: "Mettre une bache",
        travauxTroncOther: "coco",
        travauxHouppier: "other",
        travauxHouppierOther: "À définir",
        typePassage: ['velo-rollers', 'other'],
        typePassageOther: 'Passage de Marion',
        userEditedDateTravaux: '2019-04-25T13:11:17+0200',
        varietyGrade: 5.5,
        ville: null,
      },
    };

    instance.post('/arbre', payload)
      .then((response: any) => {
        expect(response.status).toBe(201);
        const arbreId = response.data.id.id;
        instance.put(`/inventaire/${arbreId}/arbre`, payloadPut)
          .then((responsePut) => {
            expect(responsePut.status).toBe(200);

            instance.get(`inventaire/${arbreId}`)
              .then(res => {
                expect(res.status).toBe(200);
                const registeredTree = res.data;
                Object.keys(expectedPutResult).forEach((key) => {
                  if (key !== 'createdAt' && key !== 'id' && key !== 'updatedAt' && key !== 'user') {
                    if (key === 'arbre') {
                      Object.keys(expectedPutResult.arbre).forEach((key) => {
                        if (key !== 'id') {
                          expect(expectedPutResult.arbre[key]).toEqual(registeredTree.arbre[key]);
                          done();
                        }
                      });
                    } else {
                      expect(expectedPutResult[key]).toEqual(registeredTree[key]);
                      done();
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
      }).catch(err => {
      console.log(err);
      done();
    });
  });
});
