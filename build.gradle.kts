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
    runtime("lambda")
    testRuntime("junit5")
    processing {
        incremental(true)
        annotations("in.praj.examsys.*")
    }
}

dependencies {
    implementation("io.micronaut:micronaut-runtime")
    implementation("javax.annotation:javax.annotation-api")
    compileOnly("org.graalvm.nativeimage:svm")
    implementation("io.micronaut:micronaut-validation")
    runtimeOnly("ch.qos.logback:logback-classic")
    testImplementation("io.micronaut:micronaut-http-client")
}


application {
    mainClass.set("in.praj.examsys.Application")
}
java {
    sourceCompatibility = JavaVersion.toVersion("11")
    targetCompatibility = JavaVersion.toVersion("11")
}



