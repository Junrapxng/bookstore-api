pipeline {
    agent any

    tools {
        nodejs "NodeJS"   // ต้องตั้ง NodeJS tool ใน Jenkins ก่อน
    }

    stages {
        stage('Checkout') {
            steps {
                echo "📦 Cloning repository..."
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                echo "📦 Installing npm dependencies..."
                sh 'npm install'
            }
        }

        stage('Start API (background)') {
            steps {
                echo "🚀 Starting Bookstore API..."
                sh 'nohup node app.js &'
                sleep 5
            }
        }

        stage('Run Postman Tests') {
            steps {
                echo "🧪 Running Postman tests with Newman..."
                sh 'npx newman run tests/bookstore.postman_collection.json -e tests/bookstore.postman_collection.json'
            }
        }

        // stage('Run K6 Load Test') {
        //     agent {
        //         docker {
        //             image 'grafana/k6:latest'
        //             args '-u root -v $PWD:$PWD -w $PWD'
        //         }
        //     }
        //     steps {
        //         echo "⚡ Running K6 performance test via Docker..."
        //         sh """
        //            mkdir -p ${REPORT_DIR}
        //            k6 run --out json=${REPORT_DIR}/k6_results.json tests/k6_test.js
        //         """
        //     }
        // }

        stage('Publish Reports') {
            steps {
                echo "📊 Publishing HTML reports..."
                publishHTML(target: [
                    reportDir: 'tests/reports',
                    reportFiles: 'newman-report.html',
                    reportName: 'Newman API Test Report'
                ])  
            }
        }
    }

    post {
        always {
            echo "✅ Pipeline finished. Cleaning up..."
            sh "pkill node || true"
        }
    }
}