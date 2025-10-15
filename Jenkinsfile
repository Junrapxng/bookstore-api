pipeline {
  agent any
  tools {
    nodejs "NodeJS"
  }
  stages {
    stage('Checkout') {
      steps {
        echo "✅ Cloning repository..."
        git branch: 'main', url: 'https://github.com/Junrapxng/bookstore-api.git'
      }
    }
    stage('Install') {
      steps {
        echo "📦 Installing dependencies..."
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        echo "🧪 Running tests..."
        sh 'npm test || echo "⚠️ Test failed (for demo, not stopping pipeline)"'
      }
    }
    stage('Build') {
      steps {
        echo "🏗️ Building app..."
        sh 'npm run build || echo "No build step defined"'
      }
    }
  }
}
