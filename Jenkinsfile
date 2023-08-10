node ('virtual-web-slave') {
    prepareEnv()

    stage ('Git Checkout'){
        checkout scm
    }
    
        if(release){
        /** Deployment */
        stage ('build') {
            def rsyncCmd = "rsync -e ssh --exclude .git -rvzau  . $serverIpAddress:$buildPath"
            sh "$rsyncCmd"
            echo "##### Syncronisation files web front #####"
             
            def BuildCmd = "cd $buildPath && rm -rf build/* && npm install  && npm run build:dev && dd if=/var/scripts/.htaccess of=build/.htaccess && cp /var/scripts/robots.txt . "
            
            echo "#####  Build pdss frontend success ######"
            
            sshPublisher(publishers: [
                    sshPublisherDesc(
                        configName: configName,
                        transfers: [sshTransfer(execCommand:"$BuildCmd",execTimeout: 900000)],
                        verbose: true
                    )
                ])
        }
    }
}

void prepareEnv(){

        if (env.BRANCH_NAME ==~ /^refactoring.*/) {
        buildPath = "/var/www/vhosts/pdss-new.mobelite.fr/pdss_web_front"
        environment = "develop"
        buildBranch = "develop"
        runBranch = "develop"
        release = true
        configName= "pdss-web"
        serverIpAddress="pdss-web@172.20.1.105"

        }
        if (env.BRANCH_NAME ==~ /^develop.*/) {
        buildPath = "/var/www/vhosts/pdss.mobelite.fr/pdss_web_front"
        environment = "develop"
        buildBranch = "develop"
        runBranch = "develop"
        release = true
        configName= "pdss-web"
        serverIpAddress="pdss-web@172.20.1.105"
        }
}
