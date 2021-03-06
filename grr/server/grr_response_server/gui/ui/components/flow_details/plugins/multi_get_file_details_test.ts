import {async, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MultiGetFileDetails} from '@app/components/flow_details/plugins/multi_get_file_details';
import {PathSpecProgressStatus} from '@app/lib/api/api_interfaces';
import {newPathSpec} from '@app/lib/api/api_test_util';
import {newFlowListEntry} from '@app/lib/models/model_test_util';
import {initTestEnvironment} from '@app/testing';

import {PluginsModule} from './module';




initTestEnvironment();

describe('multi-get-file-details component', () => {
  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          imports: [
            NoopAnimationsModule,
            PluginsModule,
          ],

          providers: []
        })
        .compileComponents();
  }));

  it('shows message if progress is not reported', () => {
    const fixture = TestBed.createComponent(MultiGetFileDetails);

    fixture.componentInstance.flowListEntry =
        newFlowListEntry({name: 'MultiGetFile'});
    fixture.detectChanges();

    expect(fixture.nativeElement.innerText)
        .toContain('The flow didn\'t report its progress');
  });

  const FLOW_LIST_ENTRY = Object.freeze(newFlowListEntry({
    name: 'MultiGetFile',
    args: {
      pathspecs: [
        newPathSpec('/path1'),
        newPathSpec('/path2'),
      ]
    },
    progress: {
      numSkipped: 0,
      numCollected: 0,
      numFailed: 0,

      pathspecsProgress: [
        {
          pathspec: newPathSpec('/path1'),
          status: PathSpecProgressStatus.IN_PROGRESS,
        },
        {
          pathspec: newPathSpec('/path2'),
          status: PathSpecProgressStatus.IN_PROGRESS,
        },
      ]
    },
  }));

  it('shows short version when isExpanded is false', () => {
    const fixture = TestBed.createComponent(MultiGetFileDetails);
    fixture.componentInstance.flowListEntry = FLOW_LIST_ENTRY;
    fixture.detectChanges();

    expect(fixture.nativeElement.innerText).toContain('Processed 0 out of 2');
    expect(fixture.nativeElement.innerText).toContain('First path');
    expect(fixture.nativeElement.innerText).toContain('/path1');
    expect(fixture.nativeElement.innerText).not.toContain('/path2');
  });

  it('shows full version when isExpanded is true', () => {
    const fixture = TestBed.createComponent(MultiGetFileDetails);
    fixture.componentInstance.flowListEntry = {
      ...FLOW_LIST_ENTRY,
      isExpanded: true,
    };
    fixture.detectChanges();

    expect(fixture.nativeElement.innerText).toContain('Processed 0 out of 2');
    expect(fixture.nativeElement.innerText).toContain('/path1');
    expect(fixture.nativeElement.innerText).toContain('/path2');
  });
});
