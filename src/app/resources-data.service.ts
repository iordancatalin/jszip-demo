import { Injectable } from '@angular/core';

import {
  faker,
  UsableLocale,
} from '@faker-js/faker';

interface IProcess {
    name: string;
    description: string;
    priority: string;
    packageName: string;
    pacakgeVersion: string;
    entryPoint: string;
    enableRecording: boolean;
    allowLiveStreaming: boolean;
    resourceType: 'Process';
}

interface IQueue {
    name: string;
    description: string;
    retentionAction: string,
    retentionDuration: string;
    storageBucket: string;
    resourceType: 'Queue';
}

interface ITrigger {
    name: string;
    process: IProcess;
    priority: string;
    runtimeType: string;
    endJobExecutions: string;
    disableTrigger: string;
    alertPendingJob: string;
    alertRunningJob: string;
}

const PRIORITY = ['Low', 'Medium', 'High'];

const RETENTION_ACTION = ['Archive', 'Delete'];

@Injectable({ providedIn: 'root' })
export class ResourcesDataService {

    private readonly _supportedLocales: UsableLocale[] = [
        'en',
        'ja',
        'ru',
        'ro',
        'zh_CN',
        'ko',
        'de',
        'fr',
        'es'
    ]

    constructor() {
    }

    generateResources() {
        return this._supportedLocales.reduce((acc, currentLocale) => {
            acc.push(...this._generateResourcesForLocale(currentLocale));
            return acc;
        }, [] as any[]);
    }

    private _generateResourcesForLocale(locale: UsableLocale) {
        faker.setLocale(locale);

        const resources = [];

        for (let i = 0; i < 5; i++) {
            resources.push(this._generateProcessData());
            resources.push(this._generateQueueData());
            resources.push(this._generateTriggerData());
        }

        return resources;
    }

    private _generateProcessData(): IProcess {
        return {
            name: faker.name.firstName(),
            description: faker.definitions.lorem?.words?.join(' ') ?? '',
            priority: PRIORITY[this._randomInRange(0, 2)],
            entryPoint: 'Main.xml',
            allowLiveStreaming: true,
            enableRecording: true,
            pacakgeVersion: faker.color.human(),
            packageName: faker.name.lastName(),
            resourceType: 'Process'
        }
    }

    private _generateQueueData(): IQueue {
        return {
            name: faker.name.firstName(),
            description: faker.definitions.lorem?.words?.join(' ') ?? '',
            retentionAction: RETENTION_ACTION[this._randomInRange(0, 1)],
            retentionDuration: faker.random.numeric(),
            storageBucket: faker.name.firstName(),
            resourceType: 'Queue',
        }
    }

    private _generateTriggerData(): ITrigger {
        return {
            name: faker.name.firstName(),
            process: this._generateProcessData(),
            priority: PRIORITY[this._randomInRange(0, 2)],
            runtimeType: faker.color.human(),
            endJobExecutions: faker.random.numeric(),
            disableTrigger: faker.random.numeric(),
            alertPendingJob: faker.random.numeric(),
            alertRunningJob: faker.random.numeric(),
        }
    }

    private _randomInRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}