plugins {
    id("com.github.johnrengelman.shadow") version "6.1.0"
    id("io.micronaut.application") version "1.4.2"
}

version = "0.0.1"
group = "in.praj.examsys"

repositories {
    mavenCentral()
}

micronaut {
    runtime("netty")
    testRuntime("junit5")
    processing {
        incremental(true)
        annotations("in.praj.examsys.*")
    }
}

dependencies {
    implementation("io.micronaut:micronaut-http-client")
    implementation("io.micronaut:micronaut-runtime")
    implementation("io.micronaut.mongodb:micronaut-mongo-sync")
    implementation("javax.annotation:javax.annotation-api")
    implementation("com.aventrix.jnanoid:jnanoid:2.0.0")
    testImplementation("org.testcontainers:junit-jupiter")
    testImplementation("org.testcontainers:mongodb")
    testImplementation("org.testcontainers:testcontainers")
    implementation("io.micronaut:micronaut-validation")
    runtimeOnly("ch.qos.logback:logback-classic")
}

application {
    mainClass.set("in.praj.examsys.Application")
}
java {
    sourceCompatibility = JavaVersion.toVersion("11")
    targetCompatibility = JavaVersion.toVersion("11")
}

val buildClient = tasks.register<Exec>("buildClient") {
    workingDir(projectDir.resolve("examsys-web"))
    commandLine("npm", "run", "build")
}

val copyClient = tasks.register<Copy>("copyClient") {
    dependsOn(buildClient)
    doFirst {
        mkdir(buildDir.resolve("resources/main/www"))
    }
    from(layout.projectDirectory.dir("examsys-web/build"))
    into(layout.buildDirectory.dir("resources/main/www"))
}

tasks.register("shadowJarWithClient") {
    dependsOn(copyClient, tasks.named("shadowJar"))
}
