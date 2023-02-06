# Create CI with Github Actions and Integrate WatchTower to automate Deployment in #
we will use Github Actions to automate Continuous integration workflow:
# Pipeline CI steps in the Dev env Pipeline name stagging.yml: 
## step 1 : Automate Image version v${major}.${minor}.${patch}:
 +  Commit message Pattern:
     major_pattern: "BREAKING CHANGE:"--> commit message should starts with "BREAKING CHANGE:"
     minor_pattern: "feat:"-->commit message should starts with "feat:"
     patch_pattern: ""--> no Prefix demanded for bug fix
 ## step 2 : Login to Docker Hub
 + add 2 secrets.ENV to connect to Docker Hub     
 ## step 3 : Build Image and publish to Docker Hub:
  + The image will be created from a Dockerfile for the Dev Environment and then will be published in the named Repo in Docker Hub

# Pipeline CI steps in the Prod env Pipeline + Automate Release Creation (production.yml+release.yml):
 ## In production.yml:
 ### Same Logic as Dev ENV: for the Images Version we will use Semantic Versioning to automate the images Tags
 +  Commit message Pattern:
     major_pattern: "BREAKING CHANGE:"--> commit message should starts with "BREAKING CHANGE:"
     minor_pattern: "feat:"-->commit message should starts with "feat:"
     patch_pattern: ""--> no Prefix demanded for bugs
 ## step 2 : Login to Docker Hub
  + add 2 secrets.ENV to connect to Docker Hub     
 ## step 3 : Build Image and publish to Docker Hub:
  + The image will be created from a Dockerfile for the Prod Environment and then will be published in the named Repo in Docker Hub     
 ## step 4 : Create a pre-release
  + in this Step we will create a pre-release 
##  release.yml file:
  + we will create our final release and publish to Docker-Hub

### Auto Deployment with Watchtower:
 + We will config watchtower container to watch the running containers and check the images version changes in the docker-hub
 + Watchtower will check any changes of the images version and will automatic apply the new Images 
 + watchtower integration will be made in the Docker-compose file.


  

