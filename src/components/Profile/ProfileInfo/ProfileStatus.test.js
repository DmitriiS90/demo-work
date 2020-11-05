import React from 'react';
import ProfileStatus from './ProfileStatus';
import {create} from 'react-test-renderer'


describe('ProfileStatus', () => {
    test('Can I programm???', () => {
        const component = create(<ProfileStatus status='DimoNN'/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('DimoNN')
    })

    test('span', () => {
        const component = create(<ProfileStatus status='DimoNN'/>);
        const root = component.root
        let span = root.findByType('span');
        expect(span).not.toBeNull()
    })
})