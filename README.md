# Create CI/CD pipeline with Github Actions for Angular App#
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



  

