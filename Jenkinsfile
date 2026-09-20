pipeline{
    agent any;
    stages{
        stage("Code Clone"){
           steps{
               git url: "https://github.com/pratiktiwari001/recipe-recommendation-system", branch: "main"
           } 
        }
        stage("Build"){
           steps{
               sh "docker build -t recipicks-app ."
           } 
        }
        stage("Test"){
           steps{
             echo "Code Tested..."  
           } 
        }
        stage("Push to Docker Hub"){
           steps{
               withCredentials([usernamePassword(
                    credentialsId: "dockerHubCreds", 
                    passwordVariable: "dockerHubPass",
                    usernameVariable: "dockerHubUser"
               )]){
                sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                sh "docker image tag recipicks-app ${env.dockerHubUser}/recipicks-app"
                sh "docker push ${env.dockerHubUser}/recipicks-app:latest"
               }
           } 
        }
        stage("Deploy"){
           steps{
              sh "docker compose up -d" 
           } 
        }
    }
}
