pipeline {
    agent any

    environment {
        DOCKER_USERNAME = "pinakss7"
    }

    stages {

        stage('Clone Repo') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend') {
    steps {
        bat "docker build -t pinakss7/agile-frontend:latest ./frontend"
    }
}

stage('Build Backend') {
    steps {
        bat "docker build -t pinakss7/agile-backend:latest ./backend"
    }
}

        stage('Login DockerHub') {
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: 'dockerhub-cred',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        bat '''
                        echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                        '''
                    }
                }
            }
        }

        stage('Push Images') {
    steps {
        bat "docker push pinakss7/agile-frontend:latest"
        bat "docker push pinakss7/agile-backend:latest"
    }
}
    }
}